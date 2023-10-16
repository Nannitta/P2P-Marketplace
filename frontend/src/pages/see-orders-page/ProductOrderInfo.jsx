import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCheckReviews from '../../hooks/useCheckReviews';
import PropTypes from 'prop-types';
import MainButton from '../../components/main-button/MainButton';
import Loading from '../../components/loading/Loading';
import './productOrderInfo.css';

const ProductOrderInfo = ({ order }) => {
    const date = new Date();
    const navigate = useNavigate();
    const { error, loading, alreadyReviewed } = useCheckReviews(order.user_buyer_id);
    const userReviews = alreadyReviewed?.userReviews;

    const isProductReviewed = userReviews?.some((review) => order.product_id === review.product_id);
    const hasDeliveryTimePassed = date > new Date(order.exchange_time);

    if (loading) {
        return <Loading />;
    }

    if (error) return toast.error(error);
    function handleClick (event) {
        event.preventDefault();
        navigate(`/order/addReview/${order.id}`);
    }

    const colorState = () => {
        if (order) {
            if (order.state === 'Nuevo' || order.state === 'En buen estado') {
                return ('#32f569');
            }
            if (order.state === 'Aceptable') {
                return ('#eaee34');
            }
            if (order.state === 'No da para más') {
                return ('#f14444');
            }
        }
    };

    return (
        <>
            <article className='product-on-sale-card'>
                <div className='img-container-product-sale'>
                    <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${order.product_photo}`} alt="Imagen del producto" />
                </div>
                <div className='info-product-sale'>
                    <div className='container-title-price'>
                        <h3>{order.name}</h3>
                        <p>{order.price} €</p>
                    </div>
                    <p style={{ color: colorState() }}>{order.state}</p>
                    <p>{order.description}</p>
                    {
                        hasDeliveryTimePassed && !isProductReviewed && order.status === 'Aceptado'
                            ? <MainButton text={'Añadir valoración'} handleClick={handleClick}/>
                            : null
                    }
                </div>
            </article>
        </>
    );
};

ProductOrderInfo.propTypes = {
    order: PropTypes.object.isRequired
};

export default ProductOrderInfo;
