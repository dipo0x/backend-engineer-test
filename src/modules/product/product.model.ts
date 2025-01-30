import { Schema, model } from 'mongoose';
import IProduct from '../../types/product/product.types';

const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
        quantity: {
			type: Number,
			required: true,
            default: 0,
		},
        image_url: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);
export const Product = model<IProduct>('Product', productSchema);