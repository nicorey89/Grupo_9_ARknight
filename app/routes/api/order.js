const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  getOrderByUser,
  addToOrder,
  clearOrder,
  removeAllFromOrder,
  removeOneItemFromOrder,
} = require("../controllers/order.controller");
const verifyToken = require("../middlewares/jwt.middleware");

router
  .get("/", verifyToken, getOrders)
  .get("/detail/:orderId", verifyToken, getOrderById)
  .get("/user", verifyToken, getOrderByUser)
  .post("/", verifyToken, addToOrder)
  .delete("/clear/:orderId", verifyToken, clearOrder)
  .delete("/:itemId", verifyToken, removeAllFromOrder)
  .put("/:itemId", verifyToken, removeOneItemFromOrder);

module.exports = router;
