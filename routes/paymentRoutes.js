const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.get("/:transaction_id", paymentController.getPaymentsByTransaction);
router.post("/", paymentController.payment);

module.exports = router;
