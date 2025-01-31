const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const penjualanRoutes = require("./routes/penjualanRoutes");
const komisiRoutes = require("./routes/komisiRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/penjualan", penjualanRoutes);
app.use("/komisi", komisiRoutes);
app.use("/payment", paymentRoutes)
// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
