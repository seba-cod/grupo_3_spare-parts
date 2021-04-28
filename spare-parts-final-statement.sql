SELECT * FROM `spare-parts`.users;CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_cart__user` (`user`),
  CONSTRAINT `fk_cart__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cart_product` (
  `cart` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`cart`,`product`),
  KEY `idx_cart_product` (`product`),
  CONSTRAINT `fk_cart_product__cart` FOREIGN KEY (`cart`) REFERENCES `cart` (`id`),
  CONSTRAINT `fk_cart_product__product` FOREIGN KEY (`product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) NOT NULL,
  `date_created` date DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `products` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order__user` (`user`),
  CONSTRAINT `fk_order__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` varchar(255) NOT NULL,
  `product` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_orderitem__order` (`order`),
  KEY `idx_orderitem__product` (`product`),
  CONSTRAINT `fk_orderitem__order` FOREIGN KEY (`order`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderitem__product` FOREIGN KEY (`product`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` decimal(2,2) NOT NULL,
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_product__category` (`category`),
  KEY `idx_product__user` (`user`),
  CONSTRAINT `fk_product__category` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product__user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;