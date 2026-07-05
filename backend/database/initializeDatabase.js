import fs from "fs";
import path from "path";

import db from "../config/db.js";
import { createAdmin } from "../services/auth.service.js";

export const initializeDatabase = () => {

    const schemaPath = path.join(
        process.cwd(),
        "database",
        "schema.sql"
    );

    const schema = fs.readFileSync(
        schemaPath,
        "utf8"
    );

    db.exec(schema);

    createAdmin();

    console.log("Database initialized successfully.");

};