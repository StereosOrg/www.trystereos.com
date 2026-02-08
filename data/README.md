# Webinar Database Directory

This directory contains the SQLite database for the webinar system.

- `webinars.db` - Main database file
- `webinars.db-wal` - Write-Ahead Log (WAL) file
- `webinars.db-shm` - Shared memory file

Do not delete these files while the application is running.

## Backup

To backup the database:
```bash
cp data/webinars.db data/webinars.backup.db
```

## Reset

To reset the database:
```bash
rm -f data/webinars.db*
bun run webinar:init:admin
```

