import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import config from '../config';

export const authenticateUser = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email}, function(error, user){
        if(!user){
            console.log("user not found");
            res.status(404).json({
                success: false,
                message: 'User not Found'
            });

        }
        else{
            if(user.comparePassword(password)){
                console.log("password correct");
                let token = jwt.sign({
                    userName: user.userName,
                    email: user.email
                }, config.webToken_secret);

                req.session.token = token;
                next();
            }
            else{
                console.log("password incorrect");
                res.json({
                    success: false,
                    message: 'Incorrect password'
                });
            }
        }
    });
};