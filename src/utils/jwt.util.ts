import jwt from 'jsonwebtoken';

type SignTokenDetails = (user: {
    _id: string;
}) => string;

const signToken: SignTokenDetails = (user) => {
    return jwt.sign({ _id: user._id }, String(process.env.ACCESS_TOKEN_PRIVATE_KEY), {
        expiresIn: `1d`,
    });
}

export default { signToken }