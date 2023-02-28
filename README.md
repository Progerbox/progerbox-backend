# Progerbox Backend

## Getting started

1. Install dependencies with `npm install` or `npm i` or `npm ci`
2. Create `.env` file in project root with variables from `.env.example`
3. Run the project:
```bash
# For develop purposes

npm run start:dev # run with watcher
npm run start:debug # run with watcher and debugger

# For production purposes

npm run start # run
npm run start:prod # rebuild and run
```

## Migrations
All migrations are placed at `src/modules/database/migrations`.

To work with migrations, use these commands (works for every OS):
```bash
# Generate SOME_NAME migration with latest entities (schemas) changes 
npm run migration:generate --name=SOME_NAME

# Create empty SOME_NAME migration
npm run migration:create --name=SOME_NAME

# Run all pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```
