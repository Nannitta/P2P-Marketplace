import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';
import { addOrderService } from '../../service';
import { toast } from 'react-toastify';
import useGetProduct from '../../hooks/useGetProduct';
import MainHeader from '../../components/header-main/MainHeader';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import MainButton from '../../components/main-button/MainButton';
import SliderPhotoProduct from './SliderPhotoProduct';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';
import './productPage.css';
import './sliderProductPage.css';

const ProductPage = () => {
    const { idProduct } = useParams();
    const { article, error, loading } = useGetProduct(idProduct);
    const { token } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const { product, productImages, user } = article;
    const userSellerId = user?.id;

    if (loading) return <Loading/>;
    if (error) toast.error(error);

    const colorState = () => {
        if (product) {
            if (product.state === 'Nuevo' || product.state === 'En buen estado') {
                return ('#32f569');
            }
            if (product.state === 'Aceptable') {
                return ('#eaee34');
            }
            if (product.state === 'No da para más') {
                return ('#f14444');
            }
        }
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            await addOrderService(idProduct, token, { userSellerId });
            toast.success('Producto reservado, pronto recibirás una respuesta del vendedor');
        } catch (error) {
            toast.error(error.message);
        } finally {
            navigate('/user/orders');
        }
    };

    return (
        <>
            <MainHeader/>
            <main>
                <div className='product-page-container'>
                    { user && product
                        ? <>
                            <div className='user-info-product-page'>
                                <UserWithRating
                                    username={user.first_name}
                                    lastName={user.last_name}
                                    avatar={user.avatar}
                                    idUser={user.id}/>
                                <ReadOnlyRating value={product.avg_review_stars}/>
                            </div>
                            <article className='product-page-article'>
                                <SliderPhotoProduct productImages={productImages}/>
                                <div className='product-sale-info'>
                                    <h2>{product.name}</h2>
                                    <p>{product.category}</p>
                                    <p>{product.description}</p>
                                    <div className='city-state-product-page'>
                                        <p>{user.city}, {new Date(product?.time).toLocaleString('es-ES', { month: 'short', day: '2-digit' })}</p>
                                        <p style={{ color: colorState() }}>{product.state}</p>
                                    </div>
                                    <p>{product.price} €</p>
                                    {
                                        token
                                            ? <MainButton text={'Comprar'} handleClick={handleClick}/>
                                            : <Link to={'/user/login'}><MainButton text={'Comprar'}/></Link>
                                    }
                                </div>
                            </article>
                        </>
                        : <p>No hemos encontrado el producto que buscabas</p>
                    }
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default ProductPage;
