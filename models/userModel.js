import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Defining the user Schema
const UserSchema = new Schema({
    userName: {required: true, type: String},
    password: {required: true, type: String},
    email: {required: true, type: String}
},
{collection: 'user'}); // Name of the collection on the database

// Hashes the password before saving to database
UserSchema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((error) => {
            console.log(`Error hashing the passowrd ${error}`);
            next(error);
        });
});

// compares hashed password against input password
UserSchema.methods.comparePassword = function(password){
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

const User = mongoose.model('user', UserSchema); // defining the user model
export {User};