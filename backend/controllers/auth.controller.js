import asyncHandler from "../utils/asyncHandler";
import * as authService from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
    const user = await authService.login(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: user
    });
});