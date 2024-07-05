import { verify } from "../utils/token.js"; 
import User from '../../models/user.model.js';
import UnAuthorizeError from '../error/UnAuthorizeError.js' ;

const authenticateMiddleware = async (req,res,next)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) throw new UnAuthorizeError('Unauthenticated');
        const decoded = verify(token);
        const user = await User.findById(decoded.id);
        if(!user) throw new UnAuthorizeError('Unauthenticated');
        req.user = user;
    } catch (error) {
        next(error)
    }
};

export default authenticateMiddleware;