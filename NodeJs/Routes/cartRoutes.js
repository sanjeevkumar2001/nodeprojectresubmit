const express = require("express");
const auth = require("../AuthMiddleware");
const { fetchAllCartItems } = require("../Controller/products.controller");
const {cartModel}= require("../Model/products.model"); // Make sure you import your cart model

const router = express.Router();

// ✅ Fetch all cart items (protected)
router.get("/cart", auth, async (req, res) => {
  try {
    const result = await fetchAllCartItems();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching all cart items:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ✅ Fetch single cart item by product id
router.get("/cart/:id", auth, async (req, res) => {
  try {
    const productId = req.params.id;

    const cartItem = await cartModel.findOne({ id: productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found for this product id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item fetched successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error fetching cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ✅ Add item to cart
router.post("/cart", auth, async (req, res) => {
  try {
    const { id, image, name, price, quantity } = req.body;

    if (!id || !name || !price || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "id, name, price, and quantity are required",
      });
    }

    // Check if item already exists in cart
    let existingItem = await cartModel.findOne({ id });
    if (existingItem) {
      // If exists, update quantity
     
      
      return res.status(200).json({
        success: false,
        message: "Already this id is present",
      
      });
    }

    // If not, create new cart item
    const newItem = new cartModel({
      id,
      image,
      name,
      price,
      quantity,
     
    });

    const savedItem = await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem: savedItem,
    });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.delete("/cart/:id",auth,async(req, res) => {
  try {
    const productId = Number(req.params.id); // convert to Number if id is Number in schema

    // Check if item exists in cart
    const existingItem = await cartModel.findOne({ id: productId });
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Delete the item
    await cartModel.deleteOne({ id: productId });

    return res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
)

router.put("/cart/:id",auth,async (req, res) => {
  try {
    const productId = Number(req.params.id); // product id from URL
    const { image, name, price, quantity } = req.body;

    // ✅ Validate mandatory fields
    if (!image || !name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "image, name, price, and quantity are required",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Find cart item
    const cartItem = await cartModel.findOne({ id: productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Update fields
    cartItem.image = image || cartItem.image;
    cartItem.name = name;
    cartItem.price = price;
    cartItem.quantity = quantity;

    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cartItem,
    });

  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
)



module.exports = router;
