import { NextFunction, Request, Response } from "express";
import ApiError from "../../helpers/error.handler";
import catchAsync from "../../utils/catchAysnc.util";
import IProduct from '../../types/product/product.types'
import { Product } from "./product.model";

export const createProduct = catchAsync(async (
    req: Request< {}, {}, IProduct>,
    res: Response,
    next: NextFunction) => {
    try {
      const { user } = req
      if(!user) return ApiError(400, "User not logged in", res);
      const { name, price, quantity, image_url } = req.body
      if(!name.trim() || !price || !quantity){
        return ApiError(400, "All fields are required", res);
      }

      const exisingProduct = await Product.exists({ name: name})
      if(exisingProduct){
        return ApiError(400, "Product with this name already exists", res);
      }
      const product = await Product.create({
        name,
        price,
        quantity,
        image_url,
        createdBy: user._id,
      })
      return res.status(201).send({
        status: 201,
        success: true,
        message: "Product successfully created",
        data: product
      });
    } catch (err) {
      console.error(err);
      return ApiError(500, "Something went wrong", res);
    }
  });

  export const getAllProductsGroupedByStore = catchAsync(async (
    req: Request,
    res: Response
) => {
    try {
     
        const products = await Product.find().populate('createdBy', 'storeName'); 
        const productsByStore: { [storeName: string]: any[] } = {}; 
        
        products.forEach((product) => {
          if (product.createdBy && typeof product.createdBy === 'object' && 'storeName' in product.createdBy) {
            const storeName = product.createdBy?.storeName; 

            if (storeName) {
                if (!productsByStore[storeName]) {
                    productsByStore[storeName] = [];
                }
                productsByStore[storeName].push(product);
            }
          }
        });

        return res.status(200).json({
            status: 200,
            success: true,
            data: productsByStore,
        });
    } catch (error) {
        console.error(error);
        return ApiError(500, "Something went wrong", res);
    }
});

export const getAllProductsInStore = catchAsync(async (
  req: Request<{}, {}, { limit: number; page: number}>,
  res: Response
) => {
  try {
      const { limit = 10, page = 1 } = req.query

      const filter: {} = { createdBy: req.user?._id } 
      const total = await Product.countDocuments(filter);
      const products = await Product.find(filter)
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1))
    
      return res.status(200).json({
          status: 200,
          success: true,
          data: products,
          total,
          page: Number(page),
          limit: Number(limit),
      });
  } catch (error) {
      console.error(error);
      return ApiError(500, "Something went wrong", res);
  }
});

export const getProductById = catchAsync(async (
  req: Request,
  res: Response
) => {
  try {
      const { id } = req.params
      const product = await Product.findById(id);
      if(!product){
        return ApiError(404, "Product not found", res);
      }
      return res.status(200).json({
          status: 200,
          success: true,
          data: product
      });
  } catch (error) {
      console.error(error);
      return ApiError(500, "Something went wrong", res);
  }
});

export const deleteProduct
 = catchAsync(async (
  req: Request,
  res: Response
) => {
  try {
      const { id } = req.params
    
      const product = await Product.findOne({
        _id: id,
        createdBy: req.user?._id
      });

      if(!product){
        return ApiError(404, "You are not authorized to delete this product", res);
      }
      await product.deleteOne()

      return res.status(200).json({
          status: 200,
          success: true,
          message: "Product deleted successfully"
      });
  } catch (error) {
      console.error(error);
      return ApiError(500, "Something went wrong", res);
  }
});