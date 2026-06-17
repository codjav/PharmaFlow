import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { ENV } from "../config/env";

const protect = (
    req, res, next
) => {
    const authHeader = req.headers.authorization;

    if (
        !authHeader || !authHeader.startsWith("Bearer ")
    ) {
        return next(
            new AppError("Unauthorized", 401)
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            ENV.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch {
        next(
            new AppError("Invalid Token", 401)
        );
    }
};

export default protect;