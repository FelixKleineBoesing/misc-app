import express from 'express';
import { auth } from '../middleware/auth';
import { User } from '../model/User';
import validator from 'validator';

export const userRouter = express.Router();

// auth middleware
userRouter.route('/user').get(auth);
userRouter.route('/user/logout').post(auth);
userRouter.route('/user/logoutall').post(auth);

userRouter.route('/user').get(async ( req: any, res: any ) => {
    res.send(req.user);
});

userRouter.route('/user/logout').post( async ( req: any, res: any ) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send({msg: 'User successfully signed out'});
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

userRouter.route('/userlogoutall').post( async ( req: any, res: any ) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).send({msg: 'User successfully signed out on all devices!'});
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

userRouter.route('/user').delete(async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const doc = await User.findOneAndDelete({ email });
        res.status(200).send({msg: 'User successfully deleted'});
    } catch ( error ) {
        console.log(error)
        res.status(400).send(error);
    }
});

userRouter.route('/user/register').post(async (req: any, res: any) => {
    try {
        const user = await User.create(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

userRouter.route('/user/login').post(async (req: any, res: any) => {
    try {
        const { username, password} = req.body;
        const user = validator.isEmail(username) ? await User.findOne({email: username}) : await User.findOne({ username });
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials!'});
        }
        const passwordCorrect = await user.comparePassword(password);
        if (!passwordCorrect) {
            throw new Error('Credentials are incorrect');
        }
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch ( error ) {
        console.log(error);
        res.status(400).send(error);
    }
});

userRouter.route('/user/isAllowed').post(async (req: any, res: any) => {
    try {
        const user = await User.create(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});