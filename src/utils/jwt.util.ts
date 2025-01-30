import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

type SignTokenDetails = (user: {
    _id: Types.ObjectId;
}) => string;

const signToken: SignTokenDetails = (user) => {
    return jwt.sign({ _id: user._id }, String(process.env.ACCESS_TOKEN_PRIVATE_KEY), {
        expiresIn: `1d`,
    });
}

export default { signToken }