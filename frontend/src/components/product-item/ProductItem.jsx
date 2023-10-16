import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './productItem.css';

const ProductItem = ({ product }) => {
    const { product_id: id, product_photos: photos, product_category: category, product_name: name, product_state: state, seller_city: sellerCity, product_time: time, product_price: price } = product;

    const [color, setColor] = useState('');

    const colorState = () => {
        if (state === 'Nuevo' || state === 'En buen estado') {
            setColor('#32f569');
        }
        if (state === 'Aceptable') {
            setColor('#eaee34');
        }
        if (state === 'No da para más') {
            setColor('#f14444');
        }
    };

    useEffect(() => {
        colorState();
    });

    return (
        <Link to={`product/${id}`}>
            <article className='product-item'>
                <div className='image-product-container'>
                    <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${photos[0]}`} alt="La imagen del producto" />
                </div>
                <p className='category-product-item'>{category}</p>
                <h2>{name}</h2>
                <p style={{ color }} className='state-product-item'>{state}</p>
                <div className='footer-product-item'>
                    <p className='city-product-item'>{sellerCity}, {new Date(time).toLocaleDateString('es-ES', { month: 'short', day: '2-digit' })}</p>
                    <p className='price-product-item'>{price} €</p>
                </div>
            </article>
        </Link>
    );
};

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductItem;
