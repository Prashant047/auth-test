import {validate} from 'email-validator';

export const validateLogin = (req, res, next) => {
    const {email, password} = req.body;
    if(validate(email) && password.length != 0){
        next();
    }

    res.status(400).json({
        message: "Login Failed"
    });
};

export const validateSignup = (req, res, next) => {
    const {userName, password, email} = req.body;
    if(validate(email) && password.length != 0 && userName.length != 0){
        next();
    }

    res.status(400).json({
        message: "SignUp Failed"
    });
};