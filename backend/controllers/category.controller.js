import asyncHandler from "../utils/asyncHandler.js";
import * as categoryService from "../services/category.service.js";

export const getAllCategories = asyncHandler(async (req, res) => {

    const categories = categoryService.getAllCategories();

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });

});

export const getCategoryById = asyncHandler(async (req, res) => {

    const category = categoryService.getCategoryById(req.params.id);

    res.status(200).json({
        success: true,
        data: category
    });

});

export const createCategory = asyncHandler(async (req, res) => {

    const category = categoryService.createCategory(req.body);

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });

});

export const updateCategory = asyncHandler(async (req, res) => {

    const category = categoryService.updateCategory(
        req.params.id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category
    });

});

export const deleteCategory = asyncHandler(async (req, res) => {

    categoryService.deleteCategory(req.params.id);

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });

});