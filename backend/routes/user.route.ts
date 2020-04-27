import express from 'express';
import { auth } from '../middleware/auth';
import { User } from '../model/User';
import validator from 'validator';

export const userRouter = express.Router();

// auth middleware
userRouter.route('/user/register').get(auth);
userRouter.route('/user/logout').post(auth);

userRouter.route('/user').get(async ( req: any, res: any ) => {
    res.send(req.user);
});

userRouter.route('/user/logout').post(async ( req: any, res: any ) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});


userRouter.route('/user/register').post(async (req: any, res: any) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        console.log(req.body);
        res.status(400).send(error);
    }
});

userRouter.route('/user/login').post(async (req: any, res: any) => {
    try {
        const { emailName, password} = req.body;
        const user = validator.isEmail(emailName) ? await User.findOne({email: emailName}) : await User.findOne({username: emailName});
        console.log(user)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials!'});
        }
        user.comparePassword(password);
        const token = user.generateAuthToken();
        res.send({ user, token});
    } catch ( error ) {
        res.status(400).send(error);
    }
});
