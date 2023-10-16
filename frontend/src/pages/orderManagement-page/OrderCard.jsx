import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { rejectOrderService } from '../../service';
import { UserAuthContext } from '../../context/UserAuthContext';
import PropTypes from 'prop-types';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import MainButton from '../../components/main-button/MainButton';
import SecondaryButton from '../../components/secondary-button/SecondaryButton';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    const { token } = useContext(UserAuthContext);

    const { id: idOrder } = order;

    function handleAccept () {
        navigate(`/order/exchangeSet/${idOrder}`);
    }

    async function handleReject () {
        await rejectOrderService(token, idOrder);
        window.location.reload();
    }

    return (
        <article className='product-on-sale-card'>
            <div className='img-container-product-sale'>
                <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${order.product_photo}`} alt="Foto del producto" />
            </div>
            <div className='info-product-sale'>
                <div className='container-title-price'>
                    <h2>{order.product_name}</h2>
                    {
                        order.status === 'Pendiente'
                            ? <p>{order.price} €</p>
                            : null
                    }
                </div>
                <p>{order.description}</p>
                <div className='buyer-info-rating'>
                    {
                        order.status === 'Pendiente'
                            ? <>
                                <UserWithRating
                                    username={order.seller_first_name}
                                    lastName={order.seller_last_name}
                                    avatar={order.avatar}
                                    idUser={order.user_buyer_id} />
                                <ReadOnlyRating value={order.avgReviews}/>
                                <div className='buyer-info-footer-card'>
                                    <p className='info-order-user-buyer'>Por {order.seller_first_name} {order.seller_last_name} el {new Date(order.created_at).toLocaleDateString('es-ES', { month: 'long', day: '2-digit' })} de {new Date(order.created_at).getFullYear()}</p>
                                    <div className='buyer-info-buttons'>
                                        <SecondaryButton text='Rechazar' handleClick={handleReject} />
                                        <MainButton text='Aceptar' handleClick={handleAccept}/>
                                    </div>
                                </div>
                            </>
                            : null
                    }
                </div>
            </div>
        </article>
    );
};

OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    avgRating: PropTypes.number
};

export default OrderCard;
