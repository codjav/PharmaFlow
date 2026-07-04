import app from "./app.js";
import { ENV } from "./config/env.js";
import { initializeDatabase } from "./database/initializeDatabase.js";

initializeDatabase();

app.listen(ENV.PORT, () => {
    console.log(`
        ==================================

        Server running on port ${ENV.PORT}

        ==================================
    `);
});
