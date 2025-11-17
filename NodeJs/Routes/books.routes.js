const express = require("express");
const { createProduct, fetchProduct,fetchProductById,addToCart ,removeFromCart,updateCartQuantity} = require("../Controller/books.controller");

const router = express.Router();

// ✅ POST endpoint to create a product
router.post("/product", createProduct);

// ✅ GET endpoint to fetch all products
router.get("/product", fetchProduct);

router.get("/product/:id",fetchProductById);

router.post("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);
router.put("/cart/:id", updateCartQuantity); 

module.exports = router; // ✅ CommonJS export (exports only router)
