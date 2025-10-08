# Deployment Instructions

## After Installing on Another PC

After installing the application on another PC, you need to configure the database connection.

### Configuring Database Connection

1. Navigate to the installation directory where the `.exe` is located
   - Usually: `C:\Program Files\casino-table-system\`
   - Or check the Start Menu shortcut properties to find the location

2. Open the `connection.txt` file with a text editor (Notepad, VS Code, etc.)

3. The file contains numbered lines in this exact format:
   ```
   1.SQL Server Host
   2.Database Name
   3.Username
   4.Password
   ```

4. **Important**: Each line MUST start with its number and a dot (e.g., `1.`, `2.`, `3.`, `4.`)

5. Example configuration for named instance:
   ```
   1.POS\SQLEXPRESS
   2.casino_table_system
   3.sa
   4.your_password_here
   ```

6. Example configuration for standard instance:
   ```
   1.192.168.1.240
   2.casino_table_system
   3.sa
   4.your_password_here
   ```

7. **Format Rules**:
   - ✅ Each line MUST start with its number and a dot (1. 2. 3. 4.)
   - ✅ Numbers must be in order (1, 2, 3, 4)
   - ✅ Values come immediately after the dot (no spaces)
   - ✅ For SQL Server named instances, use single backslash: `1.POS\SQLEXPRESS`
   - ❌ Do NOT add extra lines or comments
   - ❌ Do NOT skip numbers

8. Save the file and restart the application

### Finding Log Files

Log files are created in the same directory as the executable:
```
C:\Program Files\casino-table-system\logs\
  ├── app_YYYY-MM-DD.log       (All logs)
  └── error_YYYY-MM-DD.log     (Errors only)
```

Check these files if you encounter any issues connecting to the database.

### Troubleshooting

**If you see "Failed to open connection.txt" error:**
- The `connection.txt` file is missing or not in the correct location
- Check that `connection.txt` is in the same folder as the `.exe`
- Verify the file is not empty

**If you see "Line should start with" error:**
- Each line must start with its number and a dot
- Example: `1.POS\SQLEXPRESS` (NOT `POS\SQLEXPRESS` or `Host: POS\SQLEXPRESS`)
- Make sure there are no extra spaces before the number

**For SQL Server Named Instances:**
- Ensure SQL Server Browser service is running on the server
- The hostname must be resolvable (use IP address if not)
- Use single backslash format: `1.HOSTNAME\INSTANCENAME`

**Connection Format Examples:**
```
# Local named instance
1.localhost\SQLEXPRESS
2.MyDatabase
3.sa
4.MyPassword

# Remote named instance
1.192.168.1.100\SQLEXPRESS
2.MyDatabase
3.dbuser
4.SecurePass

# Standard instance (no backslash)
1.192.168.1.100
2.MyDatabase
3.sa
4.MyPassword
```

### Security Note

⚠️ **Important**: The `connection.txt` file contains sensitive information (database passwords). 
- Restrict file permissions to authorized users only
- Do not share or commit this file to version control
- Keep backups of this file in a secure location
