import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { toast } from 'react-toastify';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import MainHeader from '../../components/header-main/MainHeader';
import Footer from '../../components/footer/Footer';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import whatsapp from '../../assets/whatsapp.svg';
import location from '../../assets/location.svg';
import Loading from '../../components/loading/Loading';
import ProductCard from './ProductCard';
import doubleCheck from '../../assets/Vector.svg';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';
import emailIcon from '../../assets/emailIcon.svg';
import './UserProfilePage.css';

const UserProfilePage = () => {
    const { idUser } = useParams();
    const { user, loading, error, userReviews } = useGetUserProfile(idUser);
    const reviews = userReviews?.userReviews;
    const userInfo = user?.user;
    const bio = userInfo?.bio;
    const ratingsNumber = reviews?.length;
    const userProducts = user?.products;
    const sellingItems = userProducts?.filter((product) => product.availability === 1).length;
    const [clicState, setClic] = useState('sell');
    const navigate = useNavigate();

    if (loading) return <Loading/>;
    if (error) {
        navigate('/');
        return toast.error(error);
    }

    return (
        <>
            <MainHeader/>
            <main className='main-profile-page'>
                { userInfo
                    ? <div className='user-info-profile'>
                        <UserWithRating
                            username={userInfo.first_name}
                            lastName={userInfo.last_name}
                            avatar={userInfo.avatar}
                            idUser={idUser}/>
                        <ReadOnlyRating value={user.avgReview?.userAvgReviews} precision={0.5} readOnly/>
                        <div className='tel-location-container'>
                            <p>
                                <a href={`tel:${userInfo.phone_number}`}>
                                    <img src={whatsapp} alt="Icono de whatsapp" className='icon-profile'/>Whatsapp
                                </a>
                            </p>
                            <p>
                                <img src={location} alt="Icono maps" className='icon-profile'/>
                                {userInfo.city}, {userInfo.postal_code}
                            </p>
                        </div>
                    </div>
                    : clicState === 'information'
                        ? <p>No se ha encontrado al usuario</p>
                        : null
                }
                {
                    <nav className='profileMenu'>
                        <a onClick = { () => { setClic('sell'); } }>
                            <span>{sellingItems}</span>
                            <p>En venta</p>
                        </a>
                        <a onClick = { () => { setClic('rate'); } } >
                            <span>{ratingsNumber}</span>
                            <p>Valoraciones</p>
                        </a>
                        <a onClick = { () => { setClic('information'); }}>
                            <span>
                                <BsPlusLg/>
                            </span>
                            <p>Información</p>
                        </a>
                    </nav>
                }
                <section className='products-sale'>
                    {
                        userProducts && clicState === 'sell' && sellingItems !== 0
                            ? <ul id='productsOnSale'>
                                {userProducts.filter((product) => product.availability === 1).map((product) => {
                                    return <li key={product.id}>
                                        <Link to={`/product/${product.id}`}>
                                            <ProductCard product={product}/>
                                        </Link>
                                    </li>;
                                })}
                            </ul>
                            : clicState === 'sell'
                                ? <span className='not-products-sale'>No tienes productos en venta</span>
                                : null
                    }
                </section>

                <section className='user-reviews-list'>
                    {
                        reviews?.length > 0 && clicState === 'rate'
                            ? <ul id='userReviews'>
                                {reviews.map((review) => {
                                    return <li key={review.product_id}>
                                        <div className='image-product-reviewed'>
                                            <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${review.product_images}`} alt="Foto del producto" />
                                        </div>
                                        <div>
                                            <div className='review-info-product'>
                                                <h2>{review.title}</h2>
                                                <ReadOnlyRating value={parseInt(review.stars)}/>
                                                <p>{review.text}</p>
                                            </div>
                                            <div className='buyer-info'>
                                                <span>Por {review.first_name} {review.last_name} el </span>
                                                <span>{new Date(review.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </li>;
                                })}
                            </ul>
                            : clicState === 'rate'
                                ? <h5 className='not-reviews-yet'>Todavía no tienes ninguna valoración</h5>
                                : null
                    }
                </section>

                <section className='user-info-verified'>
                    { clicState === 'information' && userInfo && userInfo.bio
                        ? (<article>
                            <h2>Descripción</h2>
                            <p>{bio}</p>
                        </article>)
                        : clicState === 'information'
                            ? (
                                <article>
                                    <h2>Descripción</h2>
                                    <p>¡Fantástico! ¡Como todos nuestros usuarios! </p>
                                </article>
                            )
                            : null
                    }
                    { userInfo && clicState === 'information'
                        ? <article>
                            <h2>Información verificada</h2>
                            <div className='verified-phone-email'>
                                <div className='icon-verified'>
                                    <img src={whatsapp} alt="Icono de whatsapp" />
                                    <span>Whatsapp</span>
                                    <img src={doubleCheck} alt="Icono de doble check" />
                                </div>
                                <div className='icon-verified'>
                                    <img src={emailIcon} alt="Icono de email" />
                                    <span>Email</span>
                                    <img src={doubleCheck} alt="Icono de doble check" />
                                </div>
                            </div>
                        </article>
                        : clicState === 'information'
                            ? <p>No se ha encontrado al usuario</p>
                            : null
                    }
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default UserProfilePage;
