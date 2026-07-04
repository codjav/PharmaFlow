import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validateCategory } from "../validators/category.validator.js";

export const getAllCategories = () => {

    return db.prepare(`
        SELECT *
        FROM categories
        ORDER BY name
    `).all();

};

export const getCategoryById = (id) => {

    const category = db.prepare(`
        SELECT *
        FROM categories
        WHERE id=?
    `).get(id);

    if (!category) {
        throw new AppError(
            "Category not found",
            404
        );
    }

    return category;

};

export const createCategory = (categoryData) => {

    validateCategory(categoryData);

    const { name } = categoryData;

    const exists = db.prepare(`
        SELECT id
        FROM categories
        WHERE name=?
    `).get(name);

    if (exists) {

        throw new AppError(
            "Category already exists",
            400
        );

    }

    const result = db.prepare(`
        INSERT INTO categories(name)
        VALUES(?)
    `).run(name);

    return getCategoryById(
        result.lastInsertRowid
    );

};

export const updateCategory = (
    id,
    categoryData
) => {

    getCategoryById(id);

    validateCategory(categoryData);

    db.prepare(`
        UPDATE categories
        SET name=?
        WHERE id=?
    `).run(
        categoryData.name,
        id
    );

    return getCategoryById(id);

};

export const deleteCategory = (id) => {

    getCategoryById(id);

    db.prepare(`
        DELETE FROM categories
        WHERE id=?
    `).run(id);

};