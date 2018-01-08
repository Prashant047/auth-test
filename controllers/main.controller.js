import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import bcrypt from 'bcrypt';
import config from '../config';

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
    console.log({email, token: req.session.token});

    // res.status(200).json({
    //     success: true,
    //     token: req.session.token,
    //     message: 'Login Success'
    // });
    res.redirect('/user');
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

export const userPage = (req, res) => {
    if(!req.session.token){
        // res.json({
        //     success: false,
        //     message: 'You are not authenticated to view this page'
        // });
        res.render('pages/error', {error: {
            success: false,
            title: 'Bad Request',
            message: 'Your are not authenticated to view this page. Please Login to continue'
        }});
    }
    else{
        jwt.verify(req.session.token, config.webToken_secret, (error, decoded) => {
            if(!decoded){
                console.log('Wrong token');
                // res.json({
                //     success: false,
                //     message: 'Wrong token'
                // });
                res.render('pages/error', {error: {
                    success: false,
                    title: 'Bad Token',
                    message: 'wrong access token provided'
                }});
            } else {
                console.log(decoded);
                // res.json({
                //     success: true,
                //     token: req.session.token,
                //     message: 'You are authenticated'
                // });
                res.render('pages/user',{user: decoded});
            }
        });
    }
};