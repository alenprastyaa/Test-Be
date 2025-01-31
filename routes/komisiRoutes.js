const express = require("express");
const router = express.Router();
const komisiController = require("../controllers/komisiController");

router.get("/", komisiController.getKomisi);
module.exports = router;
