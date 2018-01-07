import express from 'express';
import {
    homePage,
    loginPage, 
    login,
    signupPage,
    signup,
    userPage
} from '../controllers/main.controller';

import {validateLogin, validateSignup} from '../middlewares/validator';
import {authenticateUser} from '../middlewares/authenticate';

const router = express.Router();

// DEFINING ALL THE [GET] ROUTES
// -----------------------------
router.get('/', homePage);
router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/user', userPage);


// DEFINING ALL THE [POST] ROUTES
// ------------------------------
router.post('/login', validateLogin, authenticateUser, login);
router.post('/signup', validateSignup, signup);

export default router;