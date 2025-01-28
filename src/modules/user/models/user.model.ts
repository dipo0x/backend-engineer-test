import { Schema, model } from 'mongoose';
import IUserDocument from '../../../types/user/user.types';

const userSchema = new Schema<IUserDocument>(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		authId: {
			type: Schema.Types.ObjectId,
			ref: 'Auth',
		},
        storeName: {
			type: String,
			required: true,
            default: '',
		},			
	},
	{
		timestamps: true,
	},
);
export const User = model<IUserDocument>('User', userSchema);