import AppError from "../utils/AppError.js";

export const validateCategory = (
    category
) => {

    if (!category.name?.trim()) {

        throw new AppError(
            "Category name is required",
            400
        );

    }

};