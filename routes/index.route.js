import express from 'express';
import {
    homePage,
    loginPage, 
    login,
    signupPage,
    signup
} from '../controllers/main.controller';

const router = express.Router();

// DEFINING ALL THE [GET] ROUTES
// -----------------------------
router.get('/', homePage);
router.get('/login', loginPage);
router.get('/signup', signupPage);


// DEFINING ALL THE [POST] ROUTES
// ------------------------------
router.post('/login',login);
router.post('/signup', signup);

export default router;