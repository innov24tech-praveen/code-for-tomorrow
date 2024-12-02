import express from 'express';
import { addServiceToCategory,
    getServicesInCategory,
    deleteServiceFromCategory,
    updateService,
  } from '../controllers/serviceControllers.js';


const router = express.Router();

router.post('/category/:categoryId/service', addServiceToCategory);
router.get('/category/:categoryId/services', getServicesInCategory);
router.delete('/category/:categoryId/service/:serviceId', deleteServiceFromCategory);
router.put('/category/:categoryId/service/:serviceId', updateService);

export default router;
