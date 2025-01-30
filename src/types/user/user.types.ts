import { Document, Types } from 'mongoose';
import IAuth from './user.auth.types';

interface IUser extends Document {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	authId: Types.ObjectId | IAuth
    storeName: string;
	createdAt: Date;
	updatedAt: Date;
}

export default IUser;