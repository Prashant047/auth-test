import mongoose from 'mongoose';
import config from '../config';

const connectDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.database, (error) => {
            if(error){
                reject(error);
            }
            else {
                resolve('Connection to database established');
            }
        });
    });
};

export {connectDatabase};