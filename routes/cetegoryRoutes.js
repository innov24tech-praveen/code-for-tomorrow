import express from 'express';
import { createCategory,
    // getAllCategories,
    getCategories,
    updateCategory,
    deleteCategory, } from '../controllers/cetegioryControllers.js';

const router = express.Router();

router.post('/categories', createCategory);
// router.get('/getAllCategories', getAllCategories); // Get All
router.get('/getCategories/:id', getCategories); // Get One by ID
router.put('/categories/:categoryId', updateCategory); // Update
router.delete('/categories/:id', deleteCategory); // Delete

export default router;
