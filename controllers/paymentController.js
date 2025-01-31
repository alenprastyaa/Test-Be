const db = require("../db");

// Menampilkan semua pembayaran
exports.getAllPayments = (req, res) => {
    const sql = `
    SELECT 
      p.id, p.transaction_id, t.transaction_number, m.name AS marketing,
      p.payment_date, p.amount_paid, p.remaining_balance, p.status
    FROM table_pembayaran p
    JOIN table_penjualan t ON p.transaction_id = t.id
    JOIN table_marketing m ON t.marketing_id = m.id
    ORDER BY p.payment_date DESC;
  `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Menampilkan pembayaran berdasarkan transaksi tertentu
exports.getPaymentsByTransaction = (req, res) => {
    const { transaction_id } = req.params;

    const sql = `
    SELECT 
      p.id, p.transaction_id, t.transaction_number, m.name AS marketing,
      p.payment_date, p.amount_paid, p.remaining_balance, p.status
    FROM table_pembayaran p
    JOIN table_penjualan t ON p.transaction_id = t.id
    JOIN table_marketing m ON t.marketing_id = m.id
    WHERE p.transaction_id = ?;
  `;

    db.query(sql, [transaction_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ message: "No payments found for this transaction." });
        }

        res.json(results);
    });
};

exports.payment = (req, res) => {
    const { transaction_id } = req.body;

    // Ambil total_balance dari transaksi
    db.query(
        `SELECT total_balance FROM table_penjualan WHERE id = ?`,
        [transaction_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length === 0) {
                return res.status(404).json({ message: "Transaction not found." });
            }

            const total_balance = results[0].total_balance;
            const installment_amount = total_balance / 12; // Cicilan tetap 12x

            // Cek total cicilan yang sudah dibayarkan
            db.query(
                `SELECT COUNT(*) AS total_installments, SUM(amount_paid) AS total_paid FROM table_pembayaran WHERE transaction_id = ?`,
                [transaction_id],
                (err, paymentResults) => {
                    if (err) return res.status(500).json({ error: err.message });

                    const total_installments = paymentResults[0].total_installments || 0;
                    const total_paid = paymentResults[0].total_paid || 0;
                    const remaining_balance = total_balance - total_paid - installment_amount;

                    if (total_installments >= 12) {
                        return res.status(400).json({ message: "All installments have been paid." });
                    }

                    const status = remaining_balance <= 0 ? "LUNAS" : "BELUM_LUNAS";

                    // Insert pembayaran cicilan
                    db.query(
                        `INSERT INTO table_pembayaran (transaction_id, payment_date, amount_paid, remaining_balance, status) 
                         VALUES (?, NOW(), ?, ?, ?)`,
                        [transaction_id, installment_amount, remaining_balance, status],
                        (err, insertResults) => {
                            if (err) return res.status(500).json({ error: err.message });

                            res.json({
                                message: "Installment payment recorded successfully",
                                payment_id: insertResults.insertId,
                                transaction_id,
                                installment_number: total_installments + 1,
                                amount_paid: installment_amount,
                                remaining_balance,
                                status,
                            });
                        }
                    );
                }
            );
        }
    );
};

