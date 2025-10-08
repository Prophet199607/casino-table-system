use log::info;
use std::sync::Arc;
use tokio::sync::Mutex;

mod commands;
mod config;
mod database;
mod logging;

use commands::{get_table_no, AppState};
use config::DbConfig;
use database::DbConnection;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize logging
    if let Err(e) = logging::init_logging() {
        eprintln!("Failed to initialize logging: {}", e);
    }

    info!("Starting Tauri application...");

    // Load database configuration
    let db_config = match DbConfig::from_file() {
        Ok(config) => config,
        Err(e) => {
            eprintln!("Failed to load database configuration: {}", e);
            std::process::exit(1);
        }
    };

    // Create database connection manager
    let db_connection = DbConnection::new(db_config);
    let app_state = AppState {
        db: Arc::new(Mutex::new(db_connection)),
    };

    tauri::Builder::default()
        .manage(app_state)
        .setup(|app| {
            info!("Tauri application setup complete");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_table_no])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
