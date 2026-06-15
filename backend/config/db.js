import Database from "better-sqlite3";
import {ENV} from './env.js';

let db;

try {
    db = new Database(ENV.DB_PATH);
    db.pragma("journal_mode = WAL");
    console.log("Database Connected");
} catch (error) {
    console.error("Failed to connect or initialize the database:", error);
    process.exit(1);
}

// If no need can remove this fuction -
function closeDatabase() {
    if(db) {
        db.close();
        console.log("Database connection closed cleanly")
    }
    process.exit(0);
}

process.on("SIGINT", closeDatabase);
process.on("SIGTERM", closeDatabase);

export default db;