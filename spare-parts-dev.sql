CREATE TABLE `category` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) UNIQUE
);

CREATE TABLE `user` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_name` VARCHAR(20) UNIQUE NOT NULL,
  `first_name` VARCHAR(25) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255),
  `admin` BOOLEAN
);

CREATE TABLE `cart` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user` INTEGER NOT NULL
);

CREATE INDEX `idx_cart__user` ON `cart` (`user`);

ALTER TABLE `cart` ADD CONSTRAINT `fk_cart__user` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

CREATE TABLE `order` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `state` VARCHAR(255) NOT NULL,
  `date_created` DATE,
  `total_price` DECIMAL(12, 2),
  `products` VARCHAR(255) NOT NULL,
  `user` INTEGER NOT NULL
);

CREATE INDEX `idx_order__user` ON `order` (`user`);

ALTER TABLE `order` ADD CONSTRAINT `fk_order__user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

CREATE TABLE `product` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user` INTEGER NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `price` DECIMAL(2, 2) NOT NULL,
  `description` VARCHAR(600) NOT NULL,
  `quantity` INTEGER,
  `brand` VARCHAR(25) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `original` BOOLEAN,
  `piecenumber` VARCHAR(255),
  `carbrand` VARCHAR(30),
  `carmodel` VARCHAR(30),
  `caryear` VARCHAR(15),
  `category` INTEGER NOT NULL
);

CREATE INDEX `idx_product__category` ON `product` (`category`);

CREATE INDEX `idx_product__user` ON `product` (`user`);

ALTER TABLE `product` ADD CONSTRAINT `fk_product__category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE;

ALTER TABLE `product` ADD CONSTRAINT `fk_product__user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

CREATE TABLE `cart_product` (
  `cart` INTEGER NOT NULL,
  `product` INTEGER NOT NULL,
  PRIMARY KEY (`cart`, `product`)
);

CREATE INDEX `idx_cart_product` ON `cart_product` (`product`);

ALTER TABLE `cart_product` ADD CONSTRAINT `fk_cart_product__cart` FOREIGN KEY (`cart`) REFERENCES `cart` (`id`);

ALTER TABLE `cart_product` ADD CONSTRAINT `fk_cart_product__product` FOREIGN KEY (`product`) REFERENCES `product` (`id`);

CREATE TABLE `orderitem` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `price` VARCHAR(255) NOT NULL,
  `product` INTEGER NOT NULL,
  `order` INTEGER NOT NULL
);

CREATE INDEX `idx_orderitem__order` ON `orderitem` (`order`);

CREATE INDEX `idx_orderitem__product` ON `orderitem` (`product`);

ALTER TABLE `orderitem` ADD CONSTRAINT `fk_orderitem__order` FOREIGN KEY (`order`) REFERENCES `order` (`id`) ON DELETE CASCADE;

ALTER TABLE `orderitem` ADD CONSTRAINT `fk_orderitem__product` FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE