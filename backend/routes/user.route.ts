import express from 'express';
import { auth } from '../middleware/auth';
import { User, Role } from '../model/User';
import validator from 'validator';
import { allowedRoutesPerRole } from '../misc/allowedRoutes';

export const userRouter = express.Router();

// auth middleware
userRouter.route('/user').get(auth);
userRouter.route('/user/logout').post(auth);
userRouter.route('/user/logout-all').post(auth);
userRouter.route('/user/is-allowed').post(auth);

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

userRouter.route('/user/logout-all').post( async ( req: any, res: any ) => {
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
            return res.status(400).send({error: 'Login failed! Check authentication credentials!'});
        }
        const passwordCorrect = await user.comparePassword(password);
        if (!passwordCorrect) {
            return res.status(400).send({error: 'Login failed! Check authentication credentials!'});
        }
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch ( error ) {
        console.log(error);
        res.status(400).send(error);
    }
});

userRouter.route('/user/is-allowed').post(async (req: any, res: any) => {
    try {
        console.log("Is Allowed")
        const role: Role = req.user.role;
        const route: string = req.body.route;
        const allowedRoutes: string[] = allowedRoutesPerRole[role];
        console.log(allowedRoutes.includes(route));
        console.log(allowedRoutes)
        console.log(allowedRoutesPerRole)
        console.log(route)
        console.log(req.body)
        const allowed = allowedRoutes.includes(route) ? true : false;
        res.status(200).send({user: req.user, allowed});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});