const getPool = require('../../db/connectDB');

async function getAllProducts (req, res, next) {
    try {
        const pool = await getPool();

        const conditions = [];
        const priceRange = [];

        const categoryFilter = req.query?.category;
        const cityFilter = req.query?.city;
        const nameFilter = req.query?.name;
        const priceFilter = req.query?.price;

        let query = `
        SELECT
            p.id AS product_id,
            p.name AS product_name,
            p.description AS product_description,
            p.price AS product_price,
            p.category AS product_category,
            p.state AS product_state,
            p.created_at AS product_time,
            p.user_id AS seller_id,
            p.availability AS availability,
            u.first_name AS seller_first_name,
            u.last_name AS seller_last_name,
            u.city AS seller_city,
            r.title AS review_title,
            r.text AS review_text,
            AVG(r.stars) AS average_review_stars,
            GROUP_CONCAT(ph.name) AS product_photos 
        FROM
            products AS p
        JOIN
            users AS u ON p.user_id = u.id
        LEFT JOIN
            reviews AS r ON p.id = r.product_id
        LEFT JOIN
            product_photo AS ph ON p.id = ph.product_id`;

        if (categoryFilter) {
            conditions.push('p.category = ?');
        }

        if (cityFilter) {
            conditions.push('u.city = ?');
        }

        if (nameFilter) {
            conditions.push('p.name LIKE ?');
        }

        if (priceFilter) {
            const [minPrice, maxPrice] = priceFilter.split('-');
            conditions.push(`p.price BETWEEN ${minPrice} AND ${maxPrice}`);
            priceRange.push(minPrice);
            priceRange.push(maxPrice);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += `
        GROUP BY
            p.id, p.name, p.description, p.category, p.user_id, u.first_name, u.last_name, u.city, r.title, r.text`;

        const nameFilterValue = nameFilter ? `%${nameFilter}%` : null;
        const params = [categoryFilter, cityFilter, nameFilterValue, priceRange].filter(value => value !== undefined);

        const [products] = await pool.query(query, params);


        const productsWithImages = products.map((product) => {
            const productPhotos = product.product_photos ? product.product_photos.split(',') : [];
            const productImageUrls = productPhotos.map((photoName) => `${photoName.trim()}`);

            return {
                ...product,
                product_photos: productImageUrls
            };
        });

        res.status(200).send({
            status: 'Ok',
            message: 'Productos disponibles',
            data: productsWithImages
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getAllProducts;
