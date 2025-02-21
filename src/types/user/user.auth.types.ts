import { Document, Types } from 'mongoose';

interface IAuth extends Document {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export default IAuth;