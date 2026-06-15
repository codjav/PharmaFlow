import express from "express";
import * as medicineController from '../controllers/medicineControllers.js'

const router = express.Router();

router.get('/', medicineController.getAllMedicines);
router.post('/', medicineController.addMedicines);
router.put('/:id', medicineController.updateMedicines);
router.delete('/:id', medicineController.deleteMedicine);

export default router;