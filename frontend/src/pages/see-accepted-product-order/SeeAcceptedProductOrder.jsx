import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';
import { getDataExchangeMap } from '../../service';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import useExchangeSet from '../../hooks/useExchangeSet';
import MainHeader from '../../components/header-main/MainHeader';
import Footer from '../../components/footer/Footer';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';
import Loading from '../../components/loading/Loading';
import './map.css';
import './see-accepted-order.css';

const SeeAcceptedProductOrder = () => {
    const { token } = useContext(UserAuthContext);
    const { idOrder } = useParams();
    const { error, loading, orderById } = useExchangeSet(token, idOrder);
    const order = orderById?.orders;
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS;
    const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });

    const colorState = () => {
        if (order) {
            if (order[0].state === 'Nuevo' || order[0].state === 'En buen estado') {
                return ('#32f569');
            }
            if (order[0].state === 'Aceptable') {
                return ('#eaee34');
            }
            if (order[0].state === 'No da para más') {
                return ('#f14444');
            }
        }
    };

    useEffect(() => {
        if (token === '' || !token) {
            navigate('/user/login');
        }
    }, []);

    useEffect(() => {
        const loadMap = async () => {
            try {
                const data = await getDataExchangeMap(orderById?.orders[0]?.exchange_place);
                setLatitude(data.lat);
                setLongitude(data.lng);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        loadMap();
    }, [orderById]);

    if (loading) return <Loading/>;
    if (error) return toast.error(error);

    return (
        <>
            <MainHeader />
            <main>
                {
                    order
                        ? <>
                            <div className='user-info-accept-order'>
                                <UserWithRating
                                    username={order[0].seller_first_name}
                                    lastName={order[0].seller_last_name[0]}
                                    avatar={order[0].seller_avatar}
                                    idUser={order[0].user_seller_id} />
                                <ReadOnlyRating value={order[0].userAvgReviews_seller} />
                            </div><div className='accept-order-container'>
                                <section>
                                    <div className='exchange-info'>
                                        <h2>Lugar de entrega</h2>
                                        <p>{order[0].exchange_place}</p>
                                        {isLoaded && latitude && longitude
                                            ? <GoogleMap zoom={10} center={{ lat: latitude, lng: longitude }} mapContainerClassName='map-container' />
                                            : null}
                                        <h2>Fecha de entrega</h2>
                                        <p>{new Date(order[0].exchange_time).toLocaleTimeString('es-ES', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </section>
                                <div className='product-buyed'>
                                    <section>
                                        <div className='title-product-exchange'>
                                            <h2>{order[0].name}</h2>
                                            <p>{order[0].category}</p>
                                        </div>
                                        <div className='exchange-product-container'>
                                            <div className='img-container-exchange'>
                                                <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${order[0].product_photo}`} alt="Foto del producto" />
                                            </div>
                                            <div className='exchange-product-info'>
                                                <p style={{ color: colorState() }}>{order[0].state}</p>
                                                <p>{order[0].description}</p>
                                                <p>{order[0].exchange_place}, {new Date(order[0].exchange_time).toLocaleString('es-ES', { month: 'short', day: '2-digit' })}</p>
                                                <p>{order[0].price} €</p>
                                            </div>
                                        </div>
                                    </section>
                                    <aside className='review-pop-up'>
                                        <p>Recuerda que tu <span>valoración</span> es <span>importante</span>. Valorar al vendedor es una manera de
                                            agradecer su servicio y ¡compartir tu experiencia con otros compradores!</p>
                                    </aside>
                                </div>
                            </div></>
                        : null
                }
            </main>
            <Footer/>
        </>
    );
};

export default SeeAcceptedProductOrder;
