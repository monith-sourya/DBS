-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2018 at 03:28 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitness`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendancet`
--

CREATE TABLE `attendancet` (
  `time` date NOT NULL,
  `person_id` bigint(20) NOT NULL,
  `place` enum('Gym','Zumba','Kick Boxing','Power Yoga') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendancet`
--

INSERT INTO `attendancet` (`time`, `person_id`, `place`) VALUES
('2018-03-02', 1083, 'Gym'),
('2018-04-27', 1083, 'Gym'),
('2018-04-28', 1068, 'Gym'),
('2018-08-17', 1083, 'Gym'),
('2019-01-11', 1083, 'Gym');

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `t_id` bigint(20) UNSIGNED NOT NULL,
  `cust_id` bigint(20) UNSIGNED NOT NULL,
  `credit` int(11) NOT NULL,
  `debit` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`t_id`, `cust_id`, `credit`, `debit`, `time`) VALUES
(9, 1068, 1000, 0, '2018-04-26 21:09:47'),
(11, 1068, 1000, 0, '2018-04-26 21:32:40'),
(12, 1083, 40, 0, '2018-04-27 08:09:25'),
(13, 1083, 400, 0, '2018-04-27 08:09:31');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` bigint(20) UNSIGNED NOT NULL,
  `cust_name` varchar(60) DEFAULT NULL,
  `sex` enum('M','F') DEFAULT 'M',
  `age` int(11) DEFAULT NULL,
  `sub_id` int(11) DEFAULT NULL,
  `sub_dur` int(11) NOT NULL COMMENT 'in months',
  `trainer_id` int(11) DEFAULT NULL,
  `attendance` int(11) DEFAULT NULL,
  `card_bal` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `phno` bigint(20) NOT NULL,
  `address` varchar(400) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `cust_name`, `sex`, `age`, `sub_id`, `sub_dur`, `trainer_id`, `attendance`, `card_bal`, `phno`, `address`, `email`) VALUES
(1068, 'Pakalu Pap', 'M', 35, 1001, 4, 90001, 0, 2379, 9999999999, 'asdadasdas', 'lolonly@lol.com'),
(1070, 'Babe', 'M', 24, 1001, 12, 11, 11, 11, 0, '', ''),
(1081, 'Jacob', 'M', 22, 2001, 1, 1001, 0, 0, 7036828333, 'Lovers Lane', 'aasd@gmail.com'),
(1082, 'Jacob Loud', 'M', 21, 1001, 0, 11111, 0, 0, 0, '', ''),
(1083, 'Pakalu Papito', 'M', 38, 1001, 2, 1001, 0, 150, 9199199191, '#111 Beverly Hills Hyderabad 50087', 'ppproudindian@123.com');

--
-- Triggers `customer`
--
DELIMITER $$
CREATE TRIGGER `userdb` AFTER INSERT ON `customer` FOR EACH ROW begin
INSERT INTO users values (NEW.cust_id, 0, 'Customer');
INSERT INTO attendancet values(NOW(), NEW.cust_id, 'Gym');
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` bigint(20) UNSIGNED NOT NULL,
  `emp_name` varchar(15) NOT NULL,
  `sal` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `sex` enum('M','F') NOT NULL,
  `job` enum('Trainer','Receptionist','Maintenance','Manager') NOT NULL,
  `attendance` int(11) NOT NULL,
  `phno` int(10) NOT NULL,
  `address` varchar(60) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `sal`, `age`, `sex`, `job`, `attendance`, `phno`, `address`, `email`) VALUES
(9902, 'Sadness', 4, 3, 'F', 'Receptionist', 0, 0, '', ''),
(9903, 'Zuck', 1612313, 31, 'M', 'Manager', 0, 0, '', ''),
(9905, '123123', 4, 1, 'F', 'Maintenance', 0, 0, '', ''),
(9906, 'asdasdas', 5, 4, 'M', 'Trainer', 0, 0, '', ''),
(9907, 'sadad', 3, 1, 'F', 'Trainer', 0, 0, '', ''),
(9908, 'ahskdjahs', 4, 4, 'F', 'Trainer', 0, 0, '', ''),
(9909, 'asdasd', 1, 1, 'F', 'Manager', 0, 0, '', ''),
(9910, 'Phlegm', 9800, 19, 'M', 'Trainer', 0, 1111111111, 'Shreyas Nose', 'greenslime@nose.com'),
(9911, 'Lemony', 20096, 30, 'F', 'Receptionist', 0, 2147483647, '#5634, BITS Pilani Hyderabad Campus, Hyderabad -78', 'imheretodestroy@gmail.com'),
(9912, 'Leo', 9998, 24, 'M', 'Trainer', 0, 2147483647, '#5634, BITS Pilani Secunderabad Campus, Hyderabad -79', 'leolol@gmail.com'),
(9913, 'Ross', 40000, 25, 'M', 'Manager', 0, 2147483647, '#5634, BITS Pilani New York Campus, New York -78', 'dinosaurlivesmatter@gmail.com'),
(9914, 'Monica ', 10000, 31, 'F', 'Maintenance', 0, 2147483647, '# 234, BITS Pilani New York Campus, New York -67', 'ineedtocleanrightnow@gmail.com');

--
-- Triggers `employee`
--
DELIMITER $$
CREATE TRIGGER `asdd` AFTER INSERT ON `employee` FOR EACH ROW begin
INSERT INTO users values (NEW.emp_id, 0, NEW.job);
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inv_equip`
--

CREATE TABLE `inv_equip` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '10'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inv_equip`
--

INSERT INTO `inv_equip` (`type_id`, `type_name`, `price`, `status`) VALUES
(1001, 'Dumbell 2.5kg', 400, 10),
(1002, 'Dumbell 5kg', 500, 10),
(1003, 'Dumbell 7.5kg', 700, 7),
(1004, 'Dumbell 10kg', 800, 4),
(1005, 'Dumbell 10kg', 800, 10),
(1006, 'Bench', 2000, 10),
(1008, 'Ab Roller', 200, 10),
(1009, 'Gym Ball', 300, 10),
(1010, 'Yoga', 100, 6),
(1011, 'Yoga Mat', 100, 10),
(1012, 'Towel', 20, 7),
(1013, 'Towel', 20, 10),
(1014, 'Towel', 20, 10);

-- --------------------------------------------------------

--
-- Table structure for table `inv_food`
--

CREATE TABLE `inv_food` (
  `inv_id` bigint(20) UNSIGNED NOT NULL,
  `inv_name` varchar(20) NOT NULL,
  `cp` int(11) NOT NULL,
  `sp` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inv_food`
--

INSERT INTO `inv_food` (`inv_id`, `inv_name`, `cp`, `sp`, `stock`) VALUES
(1001, 'Whey', 10, 20, 86),
(1002, 'Banana', 3, 5, 100),
(1003, 'Fresh Salad', 20, 50, 99),
(1006, 'Oatmeal', 10, 12, 100),
(1009, 'Almond Milk', 20, 60, 46),
(1010, 'Chicken', 30, 60, 20),
(1012, 'FIsh', 50, 90, 10);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('--mQUALb485gWfLS9KKMf8KokNZSciy3', 1524905817, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('3P62LEtmO4M0yalB7SDWtRq3hggML-uM', 1524905850, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('87w0pFg54EMQ-9rbtkngTT-k8_ekaxTA', 1524903592, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Ci4d0jd2L2P4nXqgBl2KtogDsaosr9XE', 1524898790, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('FFNr2a_CzGa3Rhg17Pt598zLbb9fwxYF', 1524905128, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"user_id\":9914,\"password\":0,\"type\":\"Maintenance\"}}}'),
('T59gTmRwOWZeSPrSTjkQVnZgAEPUlIcw', 1524896331, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"user_id\":9905,\"password\":0,\"type\":\"Maintenance\"}}}'),
('drbDKvWM-YdHe82Pzkv2X81vxJZ4F4kw', 1524900011, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"user_id\":9902,\"password\":0,\"type\":\"Receptionist\"}}}'),
('qnFZ__2yYPt2kGbKX9RPC1KnMquRarKm', 1524917829, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('t1yZb1-ABZ1SUkF26K8uUY1iuaeePVsG', 1524898587, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"disp\":[\"true\"]},\"passport\":{\"user\":{\"user_id\":9902,\"password\":0,\"type\":\"Receptionist\"}}}'),
('tTOVZjBYdTNmyaUGsR1LIFb15-IbXUxN', 1524900063, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"user_id\":9902,\"password\":0,\"type\":\"Receptionist\"}}}');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `sub_id` int(11) NOT NULL,
  `sub_name` varchar(15) CHARACTER SET hp8 NOT NULL,
  `sub_price` int(11) NOT NULL,
  `sub_gym` tinyint(1) NOT NULL,
  `sub_kb` tinyint(1) NOT NULL,
  `sub_ab` tinyint(1) NOT NULL,
  `sub_py` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='price is monthly , gym is boolean';

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`sub_id`, `sub_name`, `sub_price`, `sub_gym`, `sub_kb`, `sub_ab`, `sub_py`) VALUES
(1001, 'PLATINUM', 5000, 1, 1, 1, 1),
(2001, 'GOLD', 4000, 1, 0, 0, 1),
(3001, 'SILVER', 3000, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `t_id` bigint(20) UNSIGNED NOT NULL,
  `cust_id` bigint(20) UNSIGNED NOT NULL,
  `inv_id` bigint(20) UNSIGNED NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` int(11) NOT NULL,
  `quant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`t_id`, `cust_id`, `inv_id`, `time`, `price`, `quant`) VALUES
(44, 1068, 1001, '2018-04-25 17:25:08', 20, 18),
(45, 1068, 1006, '2018-04-25 17:25:16', 12, 7),
(46, 1068, 1009, '2018-04-26 05:26:58', 60, 5),
(48, 1068, 1009, '2018-04-26 05:28:37', 60, 5),
(50, 1068, 1001, '2018-04-26 05:41:37', 20, 0),
(53, 1068, 1001, '2018-04-27 06:33:28', 20, 1),
(56, 1068, 1001, '2018-04-27 06:38:17', 20, 1),
(57, 1068, 1001, '2018-04-27 06:41:11', 20, 0),
(60, 1083, 1001, '2018-04-27 08:09:52', 20, 2),
(61, 1083, 1003, '2018-04-27 08:10:05', 50, 1),
(62, 1083, 1001, '2018-04-27 09:19:51', 20, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `type` enum('Customer','Receptionist','Manager','Maintenance','Trainer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `type`) VALUES
(1068, '$2b$10$1f2iKczX9TZpdZai.UKgp..iIo0Q3P14HlFzazsru02.VlRL5Y/a6', 'Customer'),
(1070, '0', 'Customer'),
(1080, '0', 'Customer'),
(1081, '$2b$10$R/6B1IFFlvaOEHcW4/.UluqqM/H9njPNVQicaQUTl3VL0QKvFI0fW', 'Customer'),
(1082, '', 'Customer'),
(1083, '$2b$10$H4T0aSpFmg80vDLL9jRGS.Dku4zgBp3Y9J6mBNv1EyumGBIuZvZhG', 'Customer'),
(9902, '$2b$10$oX6nJlibYJ.nLPIq/4wzkul3zit7Ho7Rp0z8f34GakfFYvgEHHThe', 'Receptionist'),
(9903, '$2b$10$IckpSBvf9byqMyJnZzqGD.ac4H1vfKsXuU542fBrPCsxDc7vmfGOe', 'Manager'),
(9905, '$2b$10$oPGQGCwaNWTxvLQKwKWoTeoac4xQc6A4pUwvL2fAmq8YJXKogs8Zu', 'Maintenance'),
(9906, '$2b$10$t3pykvYgIwfiuC55cU7pHOBdDFsAOesroFYXCvZaJXMPSiWq3yg6m', 'Trainer'),
(9907, '$2b$10$2JVI9pdjpPN8JSywvYDkveqhKq1dAws4PUVTUks9L0.VmtG3I0xuu', 'Trainer'),
(9908, '$2b$10$JlFVO7JRKmkBaBRpLzGNe.XqpaGWEaY3G5mopWAzu2LSST7eNcdlS', 'Trainer'),
(9909, '$2b$10$jP7FXlUDrpl5LSsj8/xzdOIrgdoGP2uQJXaOIUHBdYiwvVzSsaiM6', 'Manager'),
(9910, '$2b$10$up1x3.tKxKImMC4tY8P9KeLvgl/jFM5YPXLMVesVNpVf4ba.f9x0i', 'Trainer'),
(9911, '$2b$10$eXsV7j/hKJ.WGUZQ1aDYxuK/AiF76VO/NFCba7TRTMRDzzo7b3Dke', 'Receptionist'),
(9912, '$2b$10$9KszCvGepPYGFuBV61MBx.5ligVFVL.gNxppR4avGXfGu87KSf8C.', 'Trainer'),
(9913, '$2b$10$dPZdGu4rRNubGGROzAlo4.zkbSDceI6G88.JwYKgfQJapA2xCtCRC', 'Manager'),
(9914, '$2b$10$yYmXXTQF.JmBt1y0505h3.BXI8VAmGoAbO0BaXVInZcn6kZGiJKa.', 'Maintenance');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendancet`
--
ALTER TABLE `attendancet`
  ADD PRIMARY KEY (`time`,`person_id`,`place`);

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD UNIQUE KEY `t_id` (`t_id`),
  ADD KEY `custid` (`cust_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `cust_id` (`cust_id`),
  ADD KEY `fk_sub` (`sub_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_id` (`emp_id`);

--
-- Indexes for table `inv_equip`
--
ALTER TABLE `inv_equip`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `inv_food`
--
ALTER TABLE `inv_food`
  ADD PRIMARY KEY (`inv_id`),
  ADD UNIQUE KEY `inv_id` (`inv_name`,`cp`,`sp`) USING BTREE;

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`sub_id`),
  ADD UNIQUE KEY `sub_id` (`sub_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`t_id`),
  ADD UNIQUE KEY `t_id` (`t_id`),
  ADD KEY `cust` (`cust_id`),
  ADD KEY `inv` (`inv_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `t_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1084;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9915;

--
-- AUTO_INCREMENT for table `inv_equip`
--
ALTER TABLE `inv_equip`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1015;

--
-- AUTO_INCREMENT for table `inv_food`
--
ALTER TABLE `inv_food`
  MODIFY `inv_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1013;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `t_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `custid` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_sub` FOREIGN KEY (`sub_id`) REFERENCES `subscription` (`sub_id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `cust` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`),
  ADD CONSTRAINT `inv` FOREIGN KEY (`inv_id`) REFERENCES `inv_food` (`inv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
