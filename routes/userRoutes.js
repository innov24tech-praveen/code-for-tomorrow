import express from 'express';
import { userSignup, userLogin} from '../controllers/authControllers.js';
// import { authenticateUserByRole } from '../Middleware/authenticateUser.js';

const router = express.Router();

router.post('/userSignup', userSignup);

router.post('/userLogin', userLogin);

export default router;