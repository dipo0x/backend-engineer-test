import { Document, Types } from 'mongoose';
import IUser from '../user/user.types';

interface IProduct extends Document {
	_id: Types.ObjectId;
	name: string;
	price: number;
	createdBy: Types.ObjectId | IUser;
	quantity: number;
	image_url: string;
	createdAt: Date;
	updatedAt: Date;
}

export default IProduct;