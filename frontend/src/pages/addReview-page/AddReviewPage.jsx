import { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';
import { addReviewService } from '../../service';
import { toast } from 'react-toastify';
import useExchangeSet from '../../hooks/useExchangeSet';
import MainHeader from '../../components/header-main/MainHeader';
import Footer from '../../components/footer/Footer';
import UserWithRating from '../../components/user-with-rating/UserWithRating';
import ReadOnlyRating from '../../components/readOnly-rating/ReadOnlyRating';
import GeneralInput from '../../components/generalInput/GeneralInput';
import TextArea from '../../components/text-area/TextArea';
import SecondaryButton from '../../components/secondary-button/SecondaryButton';
import MainButton from '../../components/main-button/MainButton';
import Rating from '@mui/material/Rating';
import './addReview.css';

const AddReviewPage = () => {
    const { token } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: '',
        text: '',
        stars: 4
    });

    useEffect(() => {
        if (token === '' || !token) {
            navigate('/user/login');
        }
    }, []);

    const { idOrder } = useParams();
    const { orderById } = useExchangeSet(token, idOrder);
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReviewService(token, formValues, idOrder);
            navigate('/user/orders');
            toast.success('Valoración añadida correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <MainHeader/>
            <main>
                <div className='general-container-addreview'>
                    <h1>¿Cómo ha sido tu experiencia</h1>
                    <div className='add-review-conatiner'>
                        {
                            orderById
                                ? <section className='info-user-review'>
                                    <UserWithRating
                                        username={orderById.orders[0].seller_first_name}
                                        lastName={orderById.orders[0].seller_last_name}
                                        avatar={orderById.orders[0].seller_avatar}
                                        idUser={orderById.orders[0].user_seller_id}/>
                                    <ReadOnlyRating value={orderById.orders[0].userAvgReviews_seller}/>
                                    <div className='product-img-review'>
                                        <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${orderById.orders[0].product_photo}`} alt="Foto del producto" />
                                    </div>
                                </section>
                                : null
                        }
                        <section className='form-section-review'>
                            <form onSubmit={handleSubmit} className='form-addreview'>
                                <GeneralInput type={'text'} placeholder={'Título'} value={'title'} handleChange={handleChange}/>
                                <Rating
                                    name="stars"
                                    value={parseInt(formValues.stars)}
                                    onChange={handleChange}
                                />
                                <TextArea placeholder={'Añade aquí la valoración de tu experiencia'} value={'text'} handleChange={handleChange}/>
                                <div className='form-addreview-buttons'>
                                    <Link to={'/user/orders'}>
                                        <SecondaryButton text={'Cancelar'} type='button'/>
                                    </Link>
                                    <MainButton text={'Enviar'} type='submit'/>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default AddReviewPage;
