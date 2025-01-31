const db = require("../db");

// Mendapatkan semua transaksi
exports.getAllPenjualan = (req, res) => {
    db.query("SELECT * FROM table_penjualan", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.getAllPenjual = (req, res) => {
    const sql = `SELECT id, name FROM table_marketing ORDER BY id ASC;`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// Menambahkan transaksi baru
exports.addPenjualan = (req, res) => {
    const { transaction_number, marketing_id, date, cargo_fee, total_balance, grand_total } = req.body;
    const sql = "INSERT INTO Table_penjualan (transaction_number, marketing_id, date, cargo_fee, total_balance, grand_total) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [transaction_number, marketing_id, date, cargo_fee, total_balance, grand_total], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Transaction added successfully!", transactionId: result.insertId });
    });
};
