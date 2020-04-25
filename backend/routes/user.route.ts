import express from 'express';
import { auth } from '../middleware/auth';
import { User } from '../model/User';


export const userRouter = express.Router();

// TODO middleware auth needs to be added
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


userRouter.route('/user').post(async (req: any, res: any) => {
    try {
        const user = await User.create(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.route('/user/login').post(async (req: any, res: any) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne(email);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials!'});
        }
        user.comparePassword(password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch ( error ) {
        res.status(400).send(error);
    }
});
