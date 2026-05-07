import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const dbPath = path.join(_dirname, '../database/pharmacy.db');

const sqlite3Verbose = sqlite3.verbose();

let db;

try{
    db = await open({
        filename: dbPath,
        driver: sqlite3Verbose.Database
    });

    const schemaPath = path.join(_dirname, '../database/schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');

    await db.exec(schema);

    console.log('SQLite Connected asynchronously to pharmacy.db');
} catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    process.exit(1);
}

export default db;