import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./pharmacy.db");

app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});

app.listen(5001, () => {
    console.log("Server is Listening on port 5001");
});