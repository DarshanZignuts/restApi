const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const { getOrders, addOrders, oneOrder, deleteOrder } = require("../contollers/order");

router.get("/", checkAuth, getOrders );

router.post("/", checkAuth, addOrders);

router.get("/:orderID", checkAuth, oneOrder);

router.delete("/:orderID", checkAuth, deleteOrder);

module.exports = router;