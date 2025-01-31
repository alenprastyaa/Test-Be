
const db = require("../db");

exports.getKomisi = (req, res) => {
  const sql = `
    SELECT 
    m.name AS marketing,
    DATE_FORMAT(p.date, '%M') AS bulan,
    SUM(p.total_balance) AS omzet,
    CASE 
        WHEN SUM(p.total_balance) >= 500000000 THEN '10%'
        WHEN SUM(p.total_balance) >= 200000000 THEN '5%'
        WHEN SUM(p.total_balance) >= 100000000 THEN '2.5%'
        ELSE '0%'
    END AS komisi_persen,
    CASE 
        WHEN SUM(p.total_balance) >= 500000000 THEN SUM(p.total_balance) * 0.10
        WHEN SUM(p.total_balance) >= 200000000 THEN SUM(p.total_balance) * 0.05
        WHEN SUM(p.total_balance) >= 100000000 THEN SUM(p.total_balance) * 0.025
        ELSE 0
    END AS komisi_nominal
  FROM table_penjualan p
  JOIN table_marketing m ON p.marketing_id = m.id
  GROUP BY m.name, MONTH(p.date), YEAR(p.date)
  ORDER BY YEAR(p.date) ASC, MONTH(p.date) ASC, omzet DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No sales data available." });
    }

    res.json(results);
  });
};

