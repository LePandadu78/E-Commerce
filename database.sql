-- Table pour les utilisateurs
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

-- Table pour les produits
CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  stock INT(11) NOT NULL,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Table pour les commandes
CREATE TABLE orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  product_id INT(11) NOT NULL,
  quantity INT(11) NOT NULL,
  address VARCHAR(255) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'shipped', 'delivered') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table pour les paiements
CREATE TABLE payments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  payment_method ENUM('credit_card', 'paypal', 'stripe') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);