use log::{error, info};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;
use tokio::sync::Mutex;

use crate::database::DbConnection;

/// Result structure for table settings
#[derive(Debug, Serialize, Deserialize)]
pub struct TableSettings {
    pub id: i32,
    pub table_name: String,
}

/// Application state shared across commands
pub struct AppState {
    pub db: Arc<Mutex<DbConnection>>,
}

/// Get table number from database
#[tauri::command]
pub async fn get_table_no(state: State<'_, AppState>) -> Result<String, String> {
    info!("Starting get_table_no command");

    let db = state.db.lock().await;
    let client_arc = db.get_client().await?;
    let mut client_lock = client_arc.lock().await;

    let client = client_lock
        .as_mut()
        .ok_or_else(|| "Database client not available".to_string())?;

    info!("Successfully connected to SQL Server, executing stored procedure...");

    // Execute stored procedure
    let result = client
        .simple_query("EXEC get_tbl_settings")
        .await
        .map_err(|e| {
            error!(
                "Failed to execute stored procedure 'get_tbl_settings': {}",
                e
            );
            format!("Failed to execute stored procedure: {}", e)
        })?;

    info!("Stored procedure executed, fetching results...");

    // Get the result set
    let rows = result.into_first_result().await.map_err(|e| {
        error!("Failed to get result from stored procedure: {}", e);
        format!("Failed to get result: {}", e)
    })?;

    // Extract the first row
    if let Some(row) = rows.first() {
        let id: i32 = row.get("id").ok_or_else(|| {
            error!("Failed to get 'id' column from result set");
            "Failed to get id column".to_string()
        })?;

        let table_name: &str = row.get("table_name").ok_or_else(|| {
            error!("Failed to get 'table_name' column from result set");
            "Failed to get table_name column".to_string()
        })?;

        info!(
            "Successfully retrieved table settings - ID: {}, Table Name: {}",
            id, table_name
        );
        Ok(table_name.to_string())
    } else {
        error!("No results returned from stored procedure 'get_tbl_settings'");
        Err("No results returned from stored procedure".to_string())
    }
}
