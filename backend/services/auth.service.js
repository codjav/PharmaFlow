import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../config/db";
import AppError from "../utils/AppError";
import { ENV } from "../config/env";

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
            role: user.role
        }
    };
};