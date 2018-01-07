import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import config from '../config';

export const authenticateUser = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email}, function(error, user){
        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not Found'
            });

        }
        else{
            if(user.comparePassword(password)){
                let token = jwt.sign({
                    userName: user.userName,
                    email: user.email
                }, config.webToken_secret);

                req.session.token = token;
                next();
            }
            else{
                res.json({
                    success: false,
                    message: 'Incorrect password'
                });
            }
        }
    });
};