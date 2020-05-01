import jwt from 'jsonwebtoken';
import { User } from '../model/User';
import { PRIVATE_KEY_JWT } from '../config';

export const auth = async (req: any, res: any, next: any) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, PRIVATE_KEY_JWT);
    console.log(token);
    try {
        const user = await User.findOne({_id: data, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch ( error ) {
        res.status(401).send({error: 'Not authorized'});
    }
};

