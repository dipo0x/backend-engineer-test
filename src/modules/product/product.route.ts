import { Router } from "express";
import * as productController from "./product.controller";
import authMiddleware from '../../middlewares/auth.middleware'

const router: Router = Router();

router.post("/create-product",
    authMiddleware.authenticateRequest,
    productController.createProduct
);
router.get("/products",
    authMiddleware.authenticateRequest,
    productController.getAllProductsGroupedByStore
);

router.get("/store-products",
    authMiddleware.authenticateRequest,
    productController.getAllProductsInStore
);

router.get("/product/:id",
    authMiddleware.authenticateRequest,
    productController.getProductById
);

router.delete("/delete/:id",
    authMiddleware.authenticateRequest,
    productController.deleteProduct);
    
router.patch("/edit/:id",
    authMiddleware.authenticateRequest,
    productController.editProduct
);

export default router;