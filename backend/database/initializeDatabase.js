import db from "../config/db.js";
import { createAdmin } from "../services/auth.service.js";

export const initializeDatabase = () => {
    // Tables are already created elsewhere
    // If not, call createTables() here.

    createAdmin();

    console.log("Database initialized successfully.");
};
