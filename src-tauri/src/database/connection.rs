use log::{error, info, warn};
use std::sync::Arc;
use tiberius::{AuthMethod, Client, Config as TiberiusConfig};
use tokio::net::TcpStream;
use tokio::sync::Mutex;
use tokio_util::compat::TokioAsyncWriteCompatExt;

use crate::config::DbConfig;

/// Database connection manager with connection pooling
pub struct DbConnection {
    config: DbConfig,
    client: Arc<Mutex<Option<Client<tokio_util::compat::Compat<TcpStream>>>>>,
}

impl DbConnection {
    /// Create a new database connection manager
    pub fn new(config: DbConfig) -> Self {
        Self {
            config,
            client: Arc::new(Mutex::new(None)),
        }
    }

    /// Get an active connection, reusing existing or creating new
    pub async fn get_client(
        &self,
    ) -> Result<Arc<Mutex<Option<Client<tokio_util::compat::Compat<TcpStream>>>>>, String> {
        let mut client_lock = self.client.lock().await;

        // Check if we have an active connection
        if client_lock.is_some() {
            info!("Reusing existing database connection");
            drop(client_lock); // Release the lock
            return Ok(Arc::clone(&self.client));
        }

        info!("Creating new database connection...");

        // Create new connection
        let client = self.create_connection().await?;
        *client_lock = Some(client);
        drop(client_lock);

        Ok(Arc::clone(&self.client))
    }

    /// Create a new database connection
    async fn create_connection(
        &self,
    ) -> Result<Client<tokio_util::compat::Compat<TcpStream>>, String> {
        info!(
            "Connecting to SQL Server at {} - Database: {}",
            self.config.host, self.config.database
        );

        // Configure the connection
        let mut config = TiberiusConfig::new();

        // Check if host contains a backslash (named instance)
        if self.config.host.contains('\\') {
            let parts: Vec<&str> = self.config.host.split('\\').collect();
            if parts.len() == 2 {
                let hostname = parts[0];
                let instance_name = parts[1];
                info!(
                    "Detected named instance - Host: {}, Instance: {}",
                    hostname, instance_name
                );

                config.host(hostname);
                config.instance_name(instance_name);
            } else {
                warn!("Invalid host format with backslash: {}", self.config.host);
                config.host(&self.config.host);
            }
        } else {
            config.host(&self.config.host);
        }

        config.database(&self.config.database);
        config.authentication(AuthMethod::sql_server(
            &self.config.user,
            &self.config.password,
        ));
        config.trust_cert(); // For development; use proper cert validation in production

        // Connect to SQL Server
        info!("Attempting TCP connection to SQL Server...");
        let tcp = TcpStream::connect(config.get_addr()).await.map_err(|e| {
            error!(
                "Failed to connect to SQL Server at {} - Error: {}",
                self.config.host, e
            );
            format!("Failed to connect to SQL Server: {}", e)
        })?;

        info!("TCP connection established, setting nodelay...");
        tcp.set_nodelay(true).map_err(|e| {
            error!("Failed to set TCP nodelay: {}", e);
            format!("Failed to set TCP nodelay: {}", e)
        })?;

        info!("Authenticating with SQL Server...");
        let client = Client::connect(config, tcp.compat_write())
            .await
            .map_err(|e| {
                error!(
                    "Failed to authenticate with SQL Server - User: {} - Error: {}",
                    self.config.user, e
                );
                format!("Failed to authenticate: {}", e)
            })?;

        info!("Successfully connected to SQL Server");
        Ok(client)
    }

    /// Close the database connection
    pub async fn close(&self) {
        let mut client_lock = self.client.lock().await;
        if let Some(mut client) = client_lock.take() {
            info!("Closing database connection");
            let _ = client.close().await;
        }
    }

    /// Test if connection is still alive
    pub async fn is_connected(&self) -> bool {
        let client_lock = self.client.lock().await;
        client_lock.is_some()
    }
}
