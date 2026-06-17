import AppError from '../utils/AppError.js';

export const validateSupplier = ({
    name, 
    phone
}) => {
    if(!name || !phone) {
        throw new AppError(
            "Name and phone are required",
            400
        );
    }
};