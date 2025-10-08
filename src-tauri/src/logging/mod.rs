use log::info;
use simplelog::*;
use std::fs::File;
use std::path::PathBuf;

/// Initialize application logging with separate files for general logs and errors
pub fn init_logging() -> Result<(), Box<dyn std::error::Error>> {
    let log_dir = get_log_directory()?;

    if !log_dir.exists() {
        std::fs::create_dir_all(&log_dir)?;
    }

    // Create log file paths with timestamps
    let timestamp = chrono::Local::now().format("%Y-%m-%d");
    let general_log_path = log_dir.join(format!("app_{}.log", timestamp));
    let error_log_path = log_dir.join(format!("error_{}.log", timestamp));

    // Configure logging
    CombinedLogger::init(vec![
        // Console logger for development
        TermLogger::new(
            LevelFilter::Info,
            Config::default(),
            TerminalMode::Mixed,
            ColorChoice::Auto,
        ),
        // General log file (Info level and above)
        WriteLogger::new(
            LevelFilter::Info,
            ConfigBuilder::new().set_time_format_rfc3339().build(),
            File::create(general_log_path)?,
        ),
        // Error log file (only Warn and Error)
        WriteLogger::new(
            LevelFilter::Warn,
            ConfigBuilder::new().set_time_format_rfc3339().build(),
            File::create(error_log_path)?,
        ),
    ])?;

    info!("Logging initialized successfully");
    Ok(())
}

/// Get the log directory path based on environment
fn get_log_directory() -> Result<PathBuf, Box<dyn std::error::Error>> {
    if cfg!(debug_assertions) {
        // Development: use logs folder in current directory
        Ok(PathBuf::from("logs"))
    } else {
        // Production: use logs folder next to executable
        let mut path = std::env::current_exe()?;
        path.pop(); // Remove exe name
        path.push("logs");
        Ok(path)
    }
}
