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
        res.status(200).send({msg: 'User successfully deleted'});
    } catch (error) {
        res.status(400).send(error);
    }
});


userRouter.route('/user').delete(async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const doc = await User.findOneAndDelete({ email });
        console.log(doc);
        res.send();
    } catch ( error ) {
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
        console.log(req.body);
        res.status(400).send(error);
    }
});

userRouter.route('/user/login').post(async (req: any, res: any) => {
    console.log(req.body);
    try {
        const { username, password} = req.body;
        const user = validator.isEmail(username) ? await User.findOne({email: username}) : await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials!'});
        }
        const passwordCorrect = await user.comparePassword(password);
        console.log("compared Password")
        if (!passwordCorrect) {
            throw new Error('Credentials are incorrect');
        }
        const token = user.generateAuthToken();
        console.log("generated Token");
        res.send({ user, token});
    } catch ( error ) {
        console.log(error);
        res.status(400).send(error);
    }
});
