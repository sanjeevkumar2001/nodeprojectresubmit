const express = require("express");
const auth = require("../AuthMiddleware");
const { fetchAllCartItems } = require("../Controller/books.controller");

const router = express.Router();

// Protected Cart Route
router.get("/cart", auth, async(req, res) => {
  const result = await fetchAllCartItems();
    res.json(result);

});

router.post("/cart", auth, (req, res) => {
  res.json({
    message: "Item added to cart",
    userId: req.user.id,
    item: req.body
  });
});

module.exports = router;
