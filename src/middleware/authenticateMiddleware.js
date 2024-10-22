import { verify } from "../utils/token.js"; 
import User from '../../models/user.model.js';
import UnAuthorizeError from '../error/UnAuthorizeError.js' ;

const authenticateMiddleware = async (req,res,next)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) throw new UnAuthorizeError('Unauthenticated token');
        const decoded = verify(token);
        const user = await User.findById(decoded.id);
        if(!user) throw new UnAuthorizeError('Unauthenticated user');
        req.user = user;
        next(); // เพิ่ม next() เพื่อดำเนินการต่อ
    } catch (error) {
        next(error)
    }
};

export default authenticateMiddleware;