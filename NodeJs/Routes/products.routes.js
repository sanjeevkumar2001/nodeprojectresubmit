const express = require("express");
const { createProduct, updateProduct,deleteProduct,fetchProduct,fetchProductById} = require("../Controller/products.controller");

const router = express.Router();

// ✅ POST endpoint to create a product
router.post("/product", createProduct);

// ✅ GET endpoint to fetch all products
router.get("/product", fetchProduct);

router.get("/product/:id",fetchProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id",deleteProduct);


module.exports = router; // ✅ CommonJS export (exports only router)
