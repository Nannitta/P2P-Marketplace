const getPool = require('./connectDB');

async function createDB () {
    try {
        const pool = await getPool();

        await pool.query('CREATE DATABASE IF NOT EXISTS p2p_db;');
        await pool.query('USE p2p_db;');

        await pool.query(
            'DROP TABLE IF EXISTS  orders, reviews, product_photo, products, users;'
        );

        await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) NOT NULL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        bio TEXT(500) NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
		phone_number VARCHAR(15) NOT NULL,
		city VARCHAR(50) NULL,
		postal_code VARCHAR(10) NULL,
        avatar VARCHAR(100) NULL,
        registration_code VARCHAR(100) NULL,
        active TINYINT UNSIGNED NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        modified_at DATETIME NULL
        );`);

        await pool.query(`CREATE TABLE IF NOT EXISTS products (
      	id VARCHAR(50) NOT NULL PRIMARY KEY,
      	name VARCHAR(150) NOT NULL,
      	description TEXT NULL,
		category ENUM('Consolas', 'Videojuegos', 'Accesorios', 'Retro', 'Ordenadores') NOT NULL,
		state ENUM('Nuevo', 'En buen estado', 'Aceptable', 'No da para más') NOT NULL, 
      	price DECIMAL(6,2) NULL,
		availability TINYINT UNSIGNED DEFAULT 1 NOT NULL,
      	modified_at DATETIME NULL,
      	created_at DATETIME NULL DEFAULT NOW(),
		user_id VARCHAR(50) NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users (id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE
		);`);

        await pool.query(`CREATE TABLE IF NOT EXISTS product_photo (
		id VARCHAR(50) NOT NULL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		modified_at DATETIME NULL,
		created_at DATETIME NULL DEFAULT NOW(),
		product_id VARCHAR(50) NOT NULL,
		FOREIGN KEY (product_id) REFERENCES products (id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE
		)`);

        await pool.query(`CREATE TABLE IF NOT EXISTS reviews (
		id VARCHAR(50) NOT NULL PRIMARY KEY,
		title VARCHAR(150) NOT NULL,
		text TEXT NULL,  
		stars ENUM('1', '2', '3', '4', '5') NOT NULL,
		created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		modified_at DATETIME NULL,
		product_id VARCHAR(100) NOT NULL,
		FOREIGN KEY (product_id) REFERENCES products (id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE,
		user_seller_id VARCHAR(50) NOT NULL,
		FOREIGN KEY (user_seller_id) REFERENCES users (id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE,
		user_buyer_id VARCHAR(50) NOT NULL,
		FOREIGN KEY (user_buyer_id) REFERENCES users (id)
		   ON DELETE RESTRICT
		   ON UPDATE CASCADE
    	);`);

        await pool.query(`CREATE TABLE IF NOT EXISTS orders (
   	    id VARCHAR(50) NOT NULL PRIMARY KEY,
		exchange_place VARCHAR(100) NULL,
		exchange_time DATETIME NULL,
		user_buyer_id VARCHAR(50) NOT NULL,
		status ENUM('Aceptado', 'Rechazado', 'Pendiente') NOT NULL DEFAULT 'Pendiente',
		FOREIGN KEY (user_buyer_id) REFERENCES users (id)
		   ON DELETE RESTRICT
		   ON UPDATE CASCADE,
		user_seller_id VARCHAR(50) NOT NULL,
		FOREIGN KEY (user_seller_id) REFERENCES users (id)
		   ON DELETE RESTRICT
		   ON UPDATE CASCADE,
		product_id VARCHAR(100) NOT NULL,
		FOREIGN KEY (product_id) REFERENCES products (id)
		   ON DELETE RESTRICT
		   ON UPDATE CASCADE,
		created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP
    	);`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

createDB();
