# Connection Configuration

This file contains the database connection settings for the Casino Table System.

## Format

The file must contain numbered lines in this exact format:

```
1.SQL Server Host
2.Database Name  
3.Username
4.Password
```

**Important**: Each line MUST start with its number followed by a dot (e.g., `1.`, `2.`, `3.`, `4.`)

## Examples

### Local SQL Server Named Instance
```
1.localhost\SQLEXPRESS
2.casino_table_system
3.sa
4.myPassword123
```

### Remote SQL Server Named Instance
```
1.POS\SQLEXPRESS
2.casino_table_system
3.sa
4.myPassword123
```

### Standard Instance with IP
```
1.192.168.1.240
2.casino_table_system
3.sa
4.myPassword123
```

## Important Rules

- ✅ Each line MUST start with its number and a dot (1. 2. 3. 4.)
- ✅ The numbers must be in order (1, 2, 3, 4, ...)
- ✅ Values come immediately after the dot (no spaces)
- ✅ For named instances, use a single backslash (e.g., `1.POS\SQLEXPRESS`)
- ❌ Do NOT add extra lines or comments
- ❌ Do NOT skip numbers
- ❌ Do NOT add spaces before the number

## Future Settings

Additional settings can be added using the next number in sequence:
```
1.POS\SQLEXPRESS
2.casino_table_system
3.sa
4.myPassword123
5.additional_setting_here
6.another_setting_here
```

## After Editing

1. Save the file
2. Restart the application
3. Check logs folder for connection status
