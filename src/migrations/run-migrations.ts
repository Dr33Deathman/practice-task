import { umzug } from './umzug';

const runMigrations = async () => {
  try {
    await umzug.up();
    console.log('All migrations performed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();
