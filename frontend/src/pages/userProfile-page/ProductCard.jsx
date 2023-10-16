import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../components/product-item/productItem.css';

const ProductCard = ({ product }) => {
    const [color, setColor] = useState('');

    const colorState = () => {
        if (product.state === 'Nuevo' || product.state === 'En buen estado') {
            setColor('#32f569');
        }
        if (product.state === 'Aceptable') {
            setColor('#eaee34');
        }
        if (product.state === 'No da para más') {
            setColor('#f14444');
        }
    };

    useEffect(() => {
        colorState();
    });

    return (
        <article className='product-item'>
            <div className='image-product-container'>
                <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${product.photo}`} alt="Foto del producto" />
            </div>
            <p className='category-product-item'>{product.category}</p>
            <h2>{product.name}</h2>
            <p style={{ color }} className='state-product-item'>{product.state}</p>
            <div className='footer-product-item'>
                <p className='city-product-item'>{product.city}, {new Date(product.time).toLocaleDateString('es-ES', { month: 'short', day: '2-digit' })}</p>
                <p className='price-product-item'>{product.price} €</p>
            </div>
        </article>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
