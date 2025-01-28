import { Document, Types } from 'mongoose';

interface IUser extends Document {
	_id: string;
	username: string;
	email: string;
	password: string;
	authId: Types.ObjectId;
    storeName: string;
	createdAt: Date;
	updatedAt: Date;
}

export default IUser;