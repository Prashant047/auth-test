import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    userName: {required: true, type: String},
    password: {required: true, type: String},
    email: {required: true, type: String}
},{collection: 'user'});

UserSchema.pre('save', (next) => {
    let user = this;
    bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((error) => {
            console.log(`Error in hashing password ${error.message}`);
        });
});

UserSchema.method.comparePasword = (password) => {
    let user = this;
    bcrypt.compare(password, user.password, (error, res) => {
        if(error){
            console.log(`Error in comparing password ${error.message}`)
            return false;
        }
        return res;
    });
};

export default userModel = model('user', UserSchema);