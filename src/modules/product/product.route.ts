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

// router.get("/products/:id", productController.getProductById);

// router.delete("/delete/:id", productController.deleteProduct);
// router.patch("/edit", productController.editProduct);

export default router;