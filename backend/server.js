import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import medicineRoutes from './routes/medicineRoutes.js';
import 'dotenv/config'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/medicines', medicineRoutes)

app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
});
