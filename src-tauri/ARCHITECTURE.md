# Project Structure

This document describes the modular architecture of the Casino Table System backend.

## Directory Structure

```
src-tauri/src/
├── lib.rs                  # Application entry point
├── commands/               # Tauri command handlers
│   └── mod.rs             # Database-related commands
├── config/                 # Configuration management
│   └── mod.rs             # Database configuration from connection.txt
├── database/               # Database layer
│   ├── mod.rs             # Module exports
│   └── connection.rs      # Connection pooling and management
└── logging/                # Logging configuration
    └── mod.rs             # Log initialization and setup
```

## Modules

### 1. **config** (`src/config/mod.rs`)
**Purpose**: Configuration management

**Responsibilities**:
- Read `connection.txt` file
- Parse numbered configuration format
- Validate configuration data
- Provide `DbConfig` struct with database connection details

**Key Features**:
- Auto-detects development vs production environment
- Validates numbered line format (1., 2., 3., 4.)
- Clear error messages for configuration issues

### 2. **database** (`src/database/`)
**Purpose**: Database connection management

**Responsibilities**:
- Manage SQL Server connections
- Connection pooling and reuse
- Handle named instances (e.g., `POS\SQLEXPRESS`)
- Automatic reconnection if needed

**Key Features**:
- **Connection Reuse**: Reuses existing connection instead of creating new ones
- **Thread-Safe**: Uses `Arc<Mutex<>>` for safe concurrent access
- **Named Instance Support**: Automatically detects and handles SQL Server named instances
- **Connection Testing**: Can check if connection is still alive

**Usage Example**:
```rust
let db = state.db.lock().await;
let client_arc = db.get_client().await?;
// Connection is reused on subsequent calls
```

### 3. **commands** (`src/commands/mod.rs`)
**Purpose**: Tauri command handlers

**Responsibilities**:
- Handle frontend requests
- Execute database operations
- Return data to frontend

**Key Features**:
- Uses shared `AppState` for database access
- All commands have access to the same connection pool
- Automatic logging of operations

**Adding New Commands**:
```rust
#[tauri::command]
pub async fn your_command(state: State<'_, AppState>) -> Result<YourType, String> {
    let db = state.db.lock().await;
    let client_arc = db.get_client().await?;
    // Your logic here
}
```

### 4. **logging** (`src/logging/mod.rs`)
**Purpose**: Application logging setup

**Responsibilities**:
- Initialize logging system
- Configure log files
- Separate general logs and error logs

**Key Features**:
- Daily log files with timestamps
- Console output for development
- Separate error log for quick debugging
- RFC3339 timestamp format

### 5. **lib.rs**
**Purpose**: Application entry point and orchestration

**Responsibilities**:
- Initialize logging
- Load configuration
- Create database connection manager
- Setup Tauri application
- Register command handlers

## Data Flow

```
Frontend (TypeScript)
    ↓
Tauri Commands (commands/mod.rs)
    ↓
AppState (shared state)
    ↓
DbConnection (database/connection.rs)
    ↓
SQL Server Database
```

## Connection Management

### How Connection Pooling Works:

1. **Initialization** (`lib.rs`):
   ```rust
   let db_connection = DbConnection::new(db_config);
   let app_state = AppState {
       db: Arc::new(Mutex::new(db_connection)),
   };
   ```

2. **First Request**:
   - Command calls `db.get_client().await`
   - No connection exists, creates new connection
   - Stores connection in `Arc<Mutex<>>`
   - Returns connection reference

3. **Subsequent Requests**:
   - Command calls `db.get_client().await`
   - Connection exists, reuses it
   - No new TCP connection created
   - Faster response time

### Benefits:
- ✅ **Performance**: No reconnection overhead
- ✅ **Resource Efficient**: Single connection for all requests
- ✅ **Thread-Safe**: Safe concurrent access
- ✅ **Maintainable**: Connection logic in one place

## Adding New Features

### Adding a New Database Command:

1. **Add command function** in `src/commands/mod.rs`:
   ```rust
   #[tauri::command]
   pub async fn get_users(state: State<'_, AppState>) -> Result<Vec<User>, String> {
       let db = state.db.lock().await;
       let client_arc = db.get_client().await?;
       let mut client_lock = client_arc.lock().await;
       let client = client_lock.as_mut().ok_or("Client unavailable")?;
       
       // Execute query
       let result = client.simple_query("SELECT * FROM users").await?;
       // Process result
   }
   ```

2. **Register command** in `src/lib.rs`:
   ```rust
   .invoke_handler(tauri::generate_handler![
       get_table_no,
       get_users  // Add new command here
   ])
   ```

3. **Call from frontend**:
   ```typescript
   import { invoke } from '@tauri-apps/api/tauri';
   const users = await invoke('get_users');
   ```

### Adding Configuration Options:

1. **Add to `connection.txt`**:
   ```
   1.POS\SQLEXPRESS
   2.casino_table_system
   3.sa
   4.password
   5.new_option_here
   ```

2. **Update `DbConfig` struct** in `src/config/mod.rs`:
   ```rust
   pub struct DbConfig {
       pub host: String,
       pub database: String,
       pub user: String,
       pub password: String,
       pub new_option: String,  // Add new field
   }
   ```

3. **Update parsing** in `from_file()`:
   ```rust
   let new_option = Self::parse_line(&lines[4], 5)?;
   ```

## Best Practices

1. **Error Handling**: Always use `Result<T, String>` for command returns
2. **Logging**: Log important operations (info!), warnings (warn!), and errors (error!)
3. **Connection**: Always access database through `AppState`
4. **Async**: All database operations are async
5. **Thread Safety**: Use locks appropriately, release as soon as possible

## Testing

### Development:
```bash
npm run tauri dev
```
- Logs to console and `logs/` folder
- Uses `connection.txt` from current directory

### Production Build:
```bash
npm run tauri build
```
- Logs to executable directory `logs/` folder
- Uses `connection.txt` next to executable

## Troubleshooting

### Connection Issues:
- Check `logs/error_YYYY-MM-DD.log` for errors
- Verify `connection.txt` format is correct
- Ensure SQL Server Browser service is running (for named instances)

### Adding Logs:
```rust
use log::{info, warn, error};

info!("General information");
warn!("Warning message");
error!("Error occurred: {}", error_details);
```

## Future Enhancements

Potential improvements:
- Connection health checks and auto-reconnection
- Connection timeout configuration
- Multiple database support
- Query result caching
- Database migration system
- Performance monitoring
