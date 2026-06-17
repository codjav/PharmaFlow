import AppError from "../utils/AppError";

export const validateMedicine = (medicine) => {
    const {
        name,
        batch_number,
        company, 
        mrp,
        dr_price,
        price,
        expiry_date
    } = medicine;

    if(
        !name ||
        !batch_number ||
        !company ||
        !mrp ||
        !dr_price ||
        !price ||
        !expiry_date
    ) {
        throw new AppError(
            "All required fields must be provided", 400
        );
    }
};