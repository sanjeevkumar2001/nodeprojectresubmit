const { productModel, cartModel } = require("../Model/books.model");

async function createProduct(req, res) {
  try {
    const { id, image, name, category, rating, price, description } = req.body;

    // ✅ Basic validation
    if (!id || !name || !price) {
      return res.status(400).json({ message: "id, name, and price are required" });
    }

    // ✅ Create a new product document
    const newProduct = new productModel({
      id,
      image,
      name,
      category,
      rating,
      price,
      description,
    });

    // ✅ Save to MongoDB
    const savedProduct = await newProduct.save();

    // ✅ Send success response
    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function fetchProduct(req, res) {
  try {
    const products = await productModel.find(); // ✅ await added

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" }); // ✅ better message
    }

    res.status(200).json(products); // ✅ use .json() instead of .send()
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



async function fetchAllCartItems() {
  try {
    const cartItems = await cartModel.find();  // ⬅ fetch everything

    return {
      success: true,
      message: "All cart items fetched successfully",
      cart: cartItems
    };

  } catch (error) {
    console.error("Error fetching all cart items:", error);

    return {
      success: false,
      message: "Failed to fetch cart items"
    };
  }
}



const Product = require("../Model/books.model"); // your mongoose model

// ✅ Fetch single product by id
const fetchProductById = async (req, res) => {
  try {
    // Convert id from params to number for matching with database 'id' field
    const id = Number(req.params.id);

    const product = await productModel.findOne({ id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      product, // ✅ wrap in an object for consistent frontend use
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};


// Add product to cart
// controllers/books.controller.js
const addToCart = async (req, res) => {
  try {
    const productId = Number(req.body.id);
    if (!productId)
      return res.status(400).json({ success: false, message: "Product id is required" });

    // ✅ First, check if the item already exists in the cart
    let cartItem = await cartModel.findOne({ id: productId });

    if (cartItem) {
      // ✅ If exists, increment quantity
      cartItem.quantity = (cartItem.quantity || 1) + 1;
      await cartItem.save();
      return res
        .status(200)
        .json({ success: true, message: "Product quantity updated in cart", cartItem });
    }

    // ✅ Item not in cart, add new
    const product = await productModel.findOne({ id: productId });
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const productObj = product.toObject();
    delete productObj._id;        // remove MongoDB _id
    productObj.quantity = 1;      // start with quantity 1

    cartItem = new cartModel(productObj);
    await cartItem.save();

    res.status(201).json({ success: true, message: "Product added to cart", cartItem });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Failed to add product to cart", error: error.message });
  }
};



// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const id = Number(req.params.id); // product id from URL

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const result = await cartModel.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    res.status(200).json({ success: true, message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};



// ✅ PUT /api/cart/:id → Update product quantity
// PUT /api/cart/:id
const updateCartQuantity = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const updatedCartItem = await cartModel.findOneAndUpdate(
      { id: productId },
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ success: false, message: `Product with id ${productId} not found in cart` });
    }

    return res.status(200).json({ success: true, message: "Cart quantity updated successfully", data: updatedCartItem });

  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({ success: false, message: "Failed to update cart quantity", error: error.message });
  }
};




module.exports = { fetchAllCartItems,createProduct, fetchProduct, fetchProductById, addToCart,removeFromCart,updateCartQuantity};







