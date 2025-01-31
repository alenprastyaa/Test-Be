const express = require("express");
const router = express.Router();
const penjualanController = require("../controllers/pejualanController");

router.get("/", penjualanController.getAllPenjualan);
router.get("/penjual", penjualanController.getAllPenjual);
router.post("/", penjualanController.addPenjualan);

module.exports = router;
