import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';
import { toast } from 'react-toastify';
import useSeeOrders from '../../hooks/useSeeOrders';
import Footer from '../../components/footer/Footer';
import MainHeader from '../../components/header-main/MainHeader';
import ProductOrderInfo from './ProductOrderInfo';
import Loading from '../../components/loading/Loading';
import './seeOrdersPage.css';

const SeeOrders = () => {
    const { token } = useContext(UserAuthContext);
    const { orders, error, loading } = useSeeOrders(token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === '' || !token) {
            navigate('/user/login');
        }
    });

    if (loading) return <Loading />;

    if (error) {
        toast.error(error);
        navigate('/');
    }

    return (
        <>
            <MainHeader />
            <main>
                { error
                    ? <p>{'No tienes ningún pedido de momento'}</p>
                    : <>
                        <section className='own-orders-section'>
                            <h2>Tus Pedidos</h2>
                            <ul>
                                {
                                    orders.orders
                                        ? orders.orders.filter((order) => order.status === 'Pendiente').map((order) => {
                                            return <li key={order.id}>
                                                <ProductOrderInfo order={order} />
                                            </li>;
                                        })
                                        : null
                                }

                            </ul>
                        </section>
                        <section className='accepted-orders-section'>
                            {
                                orders.orders && orders.orders.some((order) => {
                                    return order.status === 'Aceptado';
                                })
                                    ? <>
                                        <h2>Aceptados</h2>
                                        <ul>
                                            {orders.orders.filter((order) => order.status === 'Aceptado').map((order) => {
                                                return <li key={order.id}>
                                                    <Link to={`/order/accepted/${order.id}`}>
                                                        <ProductOrderInfo order={order} />
                                                    </Link>
                                                </li>;
                                            })}
                                        </ul>
                                    </>
                                    : null
                            }
                        </section>
                        <section className='rejected-orders-section'>
                            {
                                orders.orders && orders.orders.some((order) => {
                                    return order.status === 'Rechazado';
                                })
                                    ? <>
                                        <h2>Rechazados</h2>
                                        <ul>
                                            {orders.orders.filter((order) => order.status === 'Rechazado').map((order) => {
                                                return <li key={order.id}>
                                                    <ProductOrderInfo order={order} />
                                                </li>;
                                            })}
                                        </ul>
                                    </>
                                    : null
                            }
                        </section>

                    </>}
            </main>
            <Footer />
        </>
    );
};

export default SeeOrders;
