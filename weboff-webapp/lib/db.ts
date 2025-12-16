import path from 'path';
import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) return db;

  const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'weboff.db');
  db = new Database(dbPath, { readonly: false });
  return db;
}
