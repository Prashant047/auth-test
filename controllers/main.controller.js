import {User} from '../models/userModel';
import bcrypt from 'bcrypt';

export const homePage = (req, res) => {
    res.render('pages/home');
};

export const loginPage = (req, res) => {
    res.render('pages/login');
};

export const signupPage = (req, res) => {
    res.render('pages/signup');
};

export const login = (req, res) => {
    const {email, password} = req.body;
    console.log({email, password});
    res.status(200).json({
        success: true,
        message: 'Login Success'
    });
};

export const signup = (req, res) => {
    const {userName, password, email} = req.body;
    console.log({userName, password, email});

    let newUser = new User({
        userName,
        password,
        email
    });

    newUser.save((error) => {
        if(error){
            console.log(`Error saving to database ${error}`);
            res.json({
                success: false,
                message: 'Saving to database failed'
            });
        }else{
            res.json({
                success: true,
                message: 'User Created'
            });
        }
    });
};