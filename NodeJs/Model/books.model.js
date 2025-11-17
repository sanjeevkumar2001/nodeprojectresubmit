const  mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    id:Number,
    image:String,
    name:String,
    category:String,
    rating:String,
    price:Number,
    description:String
})

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String },
  name: { type: String },
  category: { type: String },
  rating: { type: String },
  price: { type: Number },
  
  quantity: { type: Number, default: 1 } // ✅ Add quantity with default 1
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const userModel = mongoose.model("User", userSchema);


const productModel = mongoose.model("product",productSchema);
const cartModel = mongoose.model("cart",cartSchema);

module.exports ={ productModel,cartModel,userModel};