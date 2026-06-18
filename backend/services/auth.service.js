import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { ENV } from "../config/env.js";

export const login = async ({ username, password }) => {
    if(!username || !password) {
        throw new AppError("Username and password are required", 400);
    }

    const user = db.prepare(`
        SELECT * 
        FROM users
        WHERE username = ?
    `).get(username);

    if(!user) {
        throw new AppError("Invalid username or password", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect) {
        throw new AppError("Invalid username or password", 401);
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        ENV.JWT_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRES_IN
        }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            fullname: user.full_name,
            email: user.email,
            role: user.role
        }
    };
};


export const createAdmin = () => {
    const existingAdmin = db.prepare(`
        SELECT *
        FROM users
        WHERE username = ?    
    `).get("admin");

    if(existingAdmin) {
        return;
    }

    const hashedPassword = bcrypt.hashSync(
        "admin123",
        10
    );

    db.prepare(`
        INSERT INTO users(
            username,
            password,
            full_name,
            role
        )
        VALUES(
            ?,?,?,?
        )
    `).run(
        "admin",
        hashedPassword,
        "Administrator",
        "ADMIN"
    );

    console.log(
        "Default admin created"
    );
};