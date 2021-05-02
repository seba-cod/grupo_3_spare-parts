	SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
	START TRANSACTION;
	SET time_zone = "+00:00";

	/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
	/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
	/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
	/*!40101 SET NAMES utf8mb4 */;

	--
	-- Base de datos: `spare-parts`
	--
	-- --------------------------------------------------------
	-- ESTRUCTURA DE TABLAS
    	--
	-- Carrito de compras: `cart`
	CREATE TABLE `cart` (
	  `id` int(11) NOT NULL,
	  `user` int(11) NOT NULL,
	  `product` int(11) NOT NULL,
	  `createdAt` datetime DEFAULT NULL,
	  `updatedAt` datetime DEFAULT NULL,
	  `deletedAt` datetime DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
	--
	-- Categorias: `categories`
	CREATE TABLE `categories` (
	  `id` int(11) NOT NULL,
	  `name` varchar(255) DEFAULT NULL,
	  `createdAt` datetime DEFAULT NULL,
	  `updatedAt` datetime DEFAULT NULL,
	  `deletedAt` datetime DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
	--
	-- Ordenes ejecutadas por usuario: `order`
	CREATE TABLE `order` (
	  `id` int(11) NOT NULL,
	  `state` varchar(255) NOT NULL,
	  `total_price` decimal(12,2) DEFAULT NULL,
	  `products` varchar(255) NOT NULL,
	  `user` int(11) NOT NULL,
	  `createdAt` datetime DEFAULT NULL,
	  `updatedAt` datetime DEFAULT NULL,
	  `deletedAt` datetime DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
	--
	-- Productos: `products`
	CREATE TABLE `products` (
	  `id` int(11) NOT NULL,
	  `user` int(11) NOT NULL,
	  `name` varchar(50) NOT NULL,
	  `price` varchar(50) NOT NULL,
	  `description` varchar(600) NOT NULL,
	  `quantity` int(11) DEFAULT NULL,
	  `brand` varchar(25) NOT NULL,
	  `image` varchar(255) NOT NULL,
	  `original` tinyint(1) DEFAULT NULL,
	  `piecenumber` varchar(255) DEFAULT NULL,
	  `carbrand` varchar(30) DEFAULT NULL,
	  `carmodel` varchar(30) DEFAULT NULL,
	  `caryear` varchar(15) DEFAULT NULL,
	  `category` int(11) NOT NULL,
	  `createdAt` datetime DEFAULT NULL,
	  `updatedAt` datetime DEFAULT NULL,
	  `deletedAt` datetime DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
	--
	-- Usuarios: `users`
	CREATE TABLE `users` (
	  `id` int(11) NOT NULL,
	  `user_name` varchar(20) NOT NULL,
	  `first_name` varchar(25) NOT NULL,
	  `last_name` varchar(30) NOT NULL,
	  `email` varchar(255) NOT NULL,
	  `address` varchar(255) NOT NULL,
	  `password` varchar(255) NOT NULL,
	  `avatar` varchar(255) DEFAULT NULL,
	  `admin` tinyint(1) DEFAULT NULL,
	  `createdAt` datetime DEFAULT NULL,
	  `updatedAt` datetime DEFAULT NULL,
	  `deletedAt` datetime DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

	-- ---------------------------------------------
	-- Volcado de datos para la tabla `users`
	INSERT INTO `users` (`id`, `user_name`, `first_name`, `last_name`, `email`, `address`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'admin', 'test1', 'test2', 'test@a.com', 'Calle Siempre Viva N°123', '$2a$10$UQNzzV2ieKNuX6h6tmmWCOY8NGHBJeeIA1l2LtfA3Q1L0eutv0vLC', 'user-1619570428891img.png', 1, '2021-04-28 00:40:29', '2021-04-28 00:40:29', NULL);
	INSERT INTO `users` (`id`, `user_name`, `first_name`, `last_name`, `email`, `address`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(2, 'Josh', 'Jose', 'Albatro', 'test@b.com', 'Calle Falsa N°123', '$2a$10$UQNzzV2ieKNuX6h6tmmWCOY8NGHBJeeIA1l2LtfA3Q1L0eutv0vLC', 'user-1619570428891img.png', NULL, '2021-04-28 00:40:30', '2021-04-28 00:40:30', NULL);
	INSERT INTO `users` (`id`, `user_name`, `first_name`, `last_name`, `email`, `address`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(3, 'Carin', 'Carla', 'Merin', 'test@c.com', 'Calle La LLana N°123', '$2a$10$UQNzzV2ieKNuX6h6tmmWCOY8NGHBJeeIA1l2LtfA3Q1L0eutv0vLC', 'user-1619570428891img.png', NULL, '2021-04-28 00:40:31', '2021-04-28 00:40:31', NULL);
	INSERT INTO `users` (`id`, `user_name`, `first_name`, `last_name`, `email`, `address`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(4, 'Herti', 'Hernesto', 'Tierra', 'test@d.com', 'Av. La Rana N°123', '$2a$10$UQNzzV2ieKNuX6h6tmmWCOY8NGHBJeeIA1l2LtfA3Q1L0eutv0vLC', 'user-1619570428891img.png', NULL, '2021-04-28 00:40:32', '2021-04-28 00:40:32', NULL);
	-- ---------------------------------------------
	-- Volcado de datos para la tabla `categories`
  INSERT INTO `categories` (`id`, `name`) VALUES ('1', 'Motor');
  INSERT INTO `categories` (`id`, `name`) VALUES ('2', 'Interior');
  INSERT INTO `categories` (`id`, `name`) VALUES ('3', 'Exterior');
  INSERT INTO `categories` (`id`, `name`) VALUES ('4', 'Accesorios');
  -- ---------------------------------------------
	-- Volcado de datos para la tabla `products`

  INSERT INTO `products` (`id`, `user`, `name`, `price`, `description`, `quantity`, `brand`, `image`, `original`, `piecenumber`, `carbrand`, `carmodel`, `caryear`, `category`) VALUES  ('2', '1', 'Rueda Michelin R17', '13980,00', 'Rueda rodado 17 de excelente calidad', '10', 'Michelin', 'default.jpg', '1', 'R821313PA', 'Todos', 'Todos', 'Todos', '3');

  INSERT INTO `products` (`id`, `user`, `name`, `price`, `description`, `quantity`, `brand`, `image`, `original`, `piecenumber`, `carbrand`, `carmodel`, `caryear`, `category`) VALUES  ('3', '3', 'Tapa de motor Civic', '7850', 'Tapa de motor Civic gen 2', '3', 'Honda', 'default.jpg', '1', 'H6aFD', 'Honda', 'Civic', '2006-2010', '1');

  INSERT INTO `products` (`id`, `user`, `name`, `price`, `description`, `quantity`, `brand`, `image`, `original`, `piecenumber`, `carbrand`, `carmodel`, `caryear`, `category`) VALUES  ('4', '4', 'Tapa de motor BMW', '19780', 'Tapa de motor BMW serie 2', '9', 'BMW', 'default.jpg', '1', 'B6aFD', 'BMW', 'Serie 2', '2008-2012', '1');

  INSERT INTO `products` (`id`, `user`, `name`, `price`, `description`, `quantity`, `brand`, `image`, `original`, `piecenumber`, `carbrand`, `carmodel`, `caryear`, `category`) VALUES  ('5', '4', 'Turbina Bora', '22800', 'Turbina de VW Bora 1.8t', '2', 'VW', 'default.jpg', '1', 'T968sdV', 'Volskwagen', 'Bora', '2012-2015', '1');

  INSERT INTO `products` (`id`, `user`, `name`, `price`, `description`, `quantity`, `brand`, `image`, `original`, `piecenumber`, `carbrand`, `carmodel`, `caryear`, `category`) VALUES  ('6', '1', 'Aromatizante interior', '800', 'Aromatizante sabor mandarina', '80', 'China', 'default.jpg', '0', 'AA55A', 'China', 'Todos', NULL, '4');
	-- ---------------------------------------------

	-- INDICES
		--
	-- Indices de la tabla `cart`

	ALTER TABLE `cart`
	  ADD PRIMARY KEY (`id`),
	  ADD KEY `idx_cart__user` (`user`),
	  ADD KEY `idx_cart__product` (`product`);
	--
	-- Indices de la tabla `categories`
	ALTER TABLE `categories`
	  ADD PRIMARY KEY (`id`),
	  ADD UNIQUE KEY `name` (`name`);
	--
	-- Indices de la tabla `order`
	ALTER TABLE `order`
	  ADD PRIMARY KEY (`id`),
	  ADD KEY `idx_order__user` (`user`);
	--
	-- Indices de la tabla `products`
	ALTER TABLE `products`
	  ADD PRIMARY KEY (`id`),
	  ADD KEY `idx_product__category` (`category`),
	  ADD KEY `idx_product__user` (`user`);
	--
	-- Indices de la tabla `users`
	ALTER TABLE `users`
	  ADD PRIMARY KEY (`id`),
	  ADD UNIQUE KEY `user_name` (`user_name`);
	--
	-- ---------------------------------------------

	-- AUTO_INCREMENT DE LAS TABLAS
    
	-- `cart`
	ALTER TABLE `cart`
	  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
	--
    
	-- `categories`
	ALTER TABLE `categories`
	  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
	--
    
	-- `order`
	ALTER TABLE `order`
	  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
	--
    
	-- `products`
	ALTER TABLE `products`
	  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
	--
    
	-- `users`
	ALTER TABLE `users`
	  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

	-- ---------------------------------------------

	-- RESTRICCIONES (CONSTRAINTS)
		--
	-- `cart`
	ALTER TABLE `cart`
	  ADD CONSTRAINT `fk_cart__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
	  ADD CONSTRAINT `fk_cart__product` FOREIGN KEY (`product`) REFERENCES `products` (`id`);
	--
    
	-- `order`
	ALTER TABLE `order`
	  ADD CONSTRAINT `fk_order__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
	--
    
	-- `products`
	ALTER TABLE `products`
	  ADD CONSTRAINT `fk_product__category` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
	  ADD CONSTRAINT `fk_product__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
	COMMIT;

	/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
	/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
	/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;