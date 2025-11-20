const { productModel, cartModel } = require("../Model/products.model");

async function createProduct(req, res) {
  try {
    const { id, image, name, category, rating, price, description, quantity } = req.body;

    // ✅ Mandatory validation
    if (!id || !name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "id, name, price and quantity are required",
      });
    }

    // ✅ Check if product already exists
    const existingProduct = await productModel.findOne({ id });
    if (existingProduct) {
      return res.status(409).json({ // 409 = Conflict
        success: false,
        message: "Product with this id already exists",
      });
    }

    // ✅ Create new product
    const newProduct = new productModel({
      id,
      image,
      name,
      category,
      rating,
      price,
      description,
      quantity,
    });

    // ✅ Save to MongoDB
    const savedProduct = await newProduct.save();

    // ✅ Send success response
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

async function updateProduct(req, res) {
  let response = {};

  try {
    const productId = req.params.id;

    const {
      image,
      name,
      category,
      rating,
      price,
      description,
      quantity
    } = req.body;

    // ❗ id is NOT extracted from body (so cannot be updated)

    // ✅ Mandatory fields
    if (!name || !price || !description || quantity === undefined) {
      response = {
        success: false,
        status: 400,
        message: "name, price, description, and quantity are required",
      };
    } else {
      // Check if product exists
      const existingProduct = await productModel.findOne({ id: productId });

      if (!existingProduct) {
        response = {
          success: false,
          status: 404,
          message: "Product not found",
        };
      } else {
        // Build update data WITHOUT id
        const updateData = {
          image,
          name,
          category,
          rating,
          price,
          description,
          quantity,
        };

        // Update product
        const updatedProduct = await productModel.findOneAndUpdate(
          { id: productId },
          updateData,
          { new: true }
        );

        response = {
          success: true,
          status: 200,
          message: "Product updated successfully",
          product: updatedProduct,
        };
      }
    }

  } catch (error) {
    console.error("Error updating product:", error);
    response = {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }

  // ✅ Single final response
  return res.status(response.status).json(response);
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id; // get product id from URL

    // Check if product exists
    const existingProduct = await productModel.findOne({ id: productId });
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete product
    await productModel.deleteOne({ id: productId });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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



const Product = require("../Model/products.model"); // your mongoose model

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







module.exports = { fetchAllCartItems,updateProduct,createProduct,deleteProduct, fetchProduct, fetchProductById};







