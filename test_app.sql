-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 31, 2025 at 08:49 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `table_marketing`
--

CREATE TABLE `table_marketing` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_marketing`
--

INSERT INTO `table_marketing` (`id`, `name`) VALUES
(1, 'Alfandy'),
(2, 'Mery'),
(3, 'Danang');

-- --------------------------------------------------------

--
-- Table structure for table `table_pembayaran`
--

CREATE TABLE `table_pembayaran` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `payment_date` date NOT NULL,
  `amount_paid` bigint(20) NOT NULL,
  `remaining_balance` bigint(20) NOT NULL,
  `status` enum('BELUM_LUNAS','LUNAS') DEFAULT 'BELUM_LUNAS'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_pembayaran`
--

INSERT INTO `table_pembayaran` (`id`, `transaction_id`, `payment_date`, `amount_paid`, `remaining_balance`, `status`) VALUES
(1, 13, '2025-01-31', 25000, 2975000, 'BELUM_LUNAS'),
(2, 13, '2025-01-31', 250000, 2725000, 'BELUM_LUNAS'),
(3, 13, '2025-01-31', 250000, 2475000, 'BELUM_LUNAS'),
(4, 24, '2025-01-31', 10833333, 119166667, 'BELUM_LUNAS'),
(5, 18, '2025-01-31', 3666667, 40333333, 'BELUM_LUNAS'),
(6, 20, '2025-01-31', 7083333, 77916667, 'BELUM_LUNAS'),
(7, 15, '2025-01-31', 5416667, 59583333, 'BELUM_LUNAS'),
(8, 13, '2025-01-31', 250000, 2225000, 'BELUM_LUNAS'),
(9, 24, '2025-01-31', 10833333, 108333334, 'BELUM_LUNAS'),
(10, 20, '2025-01-31', 7083333, 70833334, 'BELUM_LUNAS');

-- --------------------------------------------------------

--
-- Table structure for table `table_penjualan`
--

CREATE TABLE `table_penjualan` (
  `id` int(11) NOT NULL,
  `transaction_number` varchar(50) NOT NULL,
  `marketing_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `cargo_fee` decimal(10,2) DEFAULT 0.00,
  `total_balance` decimal(15,2) DEFAULT NULL,
  `grand_total` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_penjualan`
--

INSERT INTO `table_penjualan` (`id`, `transaction_number`, `marketing_id`, `date`, `cargo_fee`, `total_balance`, `grand_total`) VALUES
(13, 'TRX001', 1, '2023-05-22', 25000.00, 3000000.00, 3025000.00),
(14, 'TRX002', 3, '2023-05-22', 25000.00, 320000.00, 345000.00),
(15, 'TRX003', 1, '2023-05-22', 0.00, 65000000.00, 65000000.00),
(16, 'TRX004', 1, '2023-05-23', 10000.00, 70000000.00, 70010000.00),
(17, 'TRX005', 2, '2023-05-23', 10000.00, 80000000.00, 80010000.00),
(18, 'TRX006', 3, '2023-05-23', 12000.00, 44000000.00, 44012000.00),
(19, 'TRX007', 1, '2023-06-01', 0.00, 75000000.00, 75000000.00),
(20, 'TRX008', 2, '2023-06-02', 0.00, 85000000.00, 85000000.00),
(21, 'TRX009', 2, '2023-06-01', 0.00, 175000000.00, 175000000.00),
(22, 'TRX010', 3, '2023-06-01', 0.00, 75000000.00, 75000000.00),
(23, 'TRX011', 2, '2023-06-01', 0.00, 750020000.00, 750020000.00),
(24, 'TRX012', 3, '2023-06-01', 0.00, 130000000.00, 120000000.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_marketing`
--
ALTER TABLE `table_marketing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_pembayaran`
--
ALTER TABLE `table_pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `table_penjualan`
--
ALTER TABLE `table_penjualan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_number` (`transaction_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `table_marketing`
--
ALTER TABLE `table_marketing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `table_pembayaran`
--
ALTER TABLE `table_pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `table_penjualan`
--
ALTER TABLE `table_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `table_pembayaran`
--
ALTER TABLE `table_pembayaran`
  ADD CONSTRAINT `table_pembayaran_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `table_penjualan` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
