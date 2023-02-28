# Progerbox Backend

## Getting started

1. Install dependencies with `npm install` or `npm i` or `npm ci`
2. Create `.env` file in project root with variables from `.env.example`
3. Run the project:
```bash
# For develop purposes

# Run project with watcher
npm run start:dev

# Run project with watcher and debugger
npm run start:debug

# For production purposes

# Run project
npm run start

# Rebuild and run project
npm run start:prod
```

## Migrations
All migrations are placed at `src/modules/database/migrations`.

To work with migrations, use these commands (works for every OS):
```bash
# Create migration with name SOME_NAME
npm run migration:create --name=SOME_NAME

# Run all pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```
