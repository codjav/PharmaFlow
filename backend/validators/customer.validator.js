import AppError from "../utils/AppError.js";

export const validateCustomer = ({name, phone}) => {
    if(!name?.trim()) {
        throw new AppError(
            "Customer name is required",
            400
        );
    }

    if(!phone?.trim()) {
        throw new AppError(
            "Customer phone number is required",
            400
        );
    }
};