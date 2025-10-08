use log::{error, info};
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;

/// Database configuration structure
#[derive(Debug, Clone)]
pub struct DbConfig {
    pub host: String,
    pub database: String,
    pub user: String,
    pub password: String,
}

impl DbConfig {
    /// Read connection configuration from connection.txt
    pub fn from_file() -> Result<Self, String> {
        let config_path = Self::get_config_path()?;
        info!("Reading connection configuration from: {:?}", config_path);

        let file = File::open(&config_path).map_err(|e| {
            format!(
                "Failed to open connection.txt: {}. Please create connection.txt with database details.",
                e
            )
        })?;

        let reader = BufReader::new(file);
        let lines: Vec<String> = reader
            .lines()
            .filter_map(|line| line.ok())
            .map(|line| line.trim().to_string())
            .filter(|line| !line.is_empty())
            .collect();

        if lines.len() < 4 {
            return Err(format!(
                "Invalid connection.txt format. Expected at least 4 lines, found {}. Format:\n1.Host (e.g., 1.POS\\SQLEXPRESS)\n2.Database name\n3.Username\n4.Password",
                lines.len()
            ));
        }

        // Parse numbered lines
        let host = Self::parse_line(&lines[0], 1)
            .map_err(|e| format!("Error parsing host (line 1): {}", e))?;
        let database = Self::parse_line(&lines[1], 2)
            .map_err(|e| format!("Error parsing database (line 2): {}", e))?;
        let user = Self::parse_line(&lines[2], 3)
            .map_err(|e| format!("Error parsing username (line 3): {}", e))?;
        let password = Self::parse_line(&lines[3], 4)
            .map_err(|e| format!("Error parsing password (line 4): {}", e))?;

        let config = DbConfig {
            host,
            database,
            user,
            password,
        };

        info!(
            "Connection config loaded - Host: {}, Database: {}, User: {}",
            config.host, config.database, config.user
        );

        Ok(config)
    }

    /// Get the configuration file path based on environment
    fn get_config_path() -> Result<PathBuf, String> {
        if cfg!(debug_assertions) {
            // Development: use connection.txt in current directory
            Ok(PathBuf::from("connection.txt"))
        } else {
            // Production: use connection.txt next to executable
            let mut path = std::env::current_exe()
                .map_err(|e| format!("Failed to get executable path: {}", e))?;
            path.pop(); // Remove exe name
            path.push("connection.txt");
            Ok(path)
        }
    }

    /// Parse a numbered line (e.g., "1.POS\SQLEXPRESS" -> "POS\SQLEXPRESS")
    fn parse_line(line: &str, expected_num: usize) -> Result<String, String> {
        let prefix = format!("{}.", expected_num);
        if line.starts_with(&prefix) {
            Ok(line[prefix.len()..].to_string())
        } else {
            Err(format!(
                "Line {} should start with '{}' but found: '{}'",
                expected_num, prefix, line
            ))
        }
    }
}
