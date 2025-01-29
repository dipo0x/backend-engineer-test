import { Schema, model } from 'mongoose';
import IAuth from '../../../types/user/user.auth.types';

const authSchema = new Schema<IAuth>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
            required: false
		},	
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	},
);
export const Auth = model<IAuth>('Auth', authSchema);