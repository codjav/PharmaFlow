import Medicine from "../models/Medicine.js";

// 1. GET all medicines
export const getAllMedicines = (req, res) => {
    try{
        const list = Medicine.findAll();
        res.status(200).json(list);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

// 2. POST create new medicine
export const addMedicines = (req, res) => {
    try{
        const {name, batch_number, barcode, category, company, supplier_id, mrp, dr_price, price, quantity, expiry_date} = req.body;

        if(!name || !batch_number || !company || !supplier_id || !mrp || !dr_price || !price || quantity === undefined || !expiry_date) {
            return res.status(400).json({message: "Please fill required input fields."})
        }

        const newId = Medicine.create({name, batch_number, barcode, category, company, supplier_id, mrp, dr_price, price, quantity, expiry_date});
        res.status(201).json({ message: "Medicine added successfully", id: newId });
    }catch(error) {
        if(error.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({message: "A medicine with this name already exists."});
        }
        return res.status(500).json({error: error.message});
    }
};

// 3. PUT update existing medicine
export const updateMedicines = (req, res) => {
    try{
        const {id} = req.params;
        const success = Medicine.update(id, req.body);

        if(!success) {
            return res.status(404).json({message: "Medicine record not found."})
        }
        res.status(200).json({message: "Inventory updated successfully."})
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. DELETE medicine
export const deleteMedicine = (req, res) => {
    try{
        const {id} = req.params;
        const success = Medicine.delete(id);

        if(!success) {
            return res.status(400).json({message: "Medicine record not found."})
        }
        res.status(200).json('Deleted Successfully.');
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};