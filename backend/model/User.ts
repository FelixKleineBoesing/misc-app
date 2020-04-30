import mongoose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY_JWT } from '../config';

const Schema = mongoose.Schema;


export enum Role {
    user,
    admin
}


export interface IUserDocument extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    role?: Role;
    tokens: object[];
    comparePassword(password: any): any;
    generateAuthToken(): string;
}


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator(value: any): boolean {
                if (!validator.isEmail(value)) {
                    return false;
                } else {
                return true;
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role: {
        type: Role,
        required: true
    }
}, {
    timestamps: true,
    collection: 'user'
});

UserSchema.pre('save', function(next: any) {
    const user: any = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 8).then(pw => {
            user.password = pw;
            next();
        });
    } else {
        next();
    }
});

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, PRIVATE_KEY_JWT);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

UserSchema.methods.comparePassword = async function(password: any) {
    const user = this;
    console.log(password)
    console.log(user.password)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    return isPasswordMatch;
};

export const User = mongoose.model<IUserDocument>('User', UserSchema);
