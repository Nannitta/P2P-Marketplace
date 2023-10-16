import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserService } from '../../service';
import { UserAuthContext } from '../../context/UserAuthContext';
import { toast } from 'react-toastify';
import HeaderSecond from '../../components/header-second/HeaderSecond';
import Footer from '../../components/footer/Footer';
import LogInImage from '../../assets/loginImg.webp';
import GeneralInput from '../../components/generalInput/GeneralInput';
import Password from '../../components/password/Password';
import MainButton from '../../components/main-button/MainButton';
import './loginPageStyles.css';

const LoginPage = () => {
    const { login } = useContext(UserAuthContext);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    async function handleSubmit (event) {
        event.preventDefault();

        try {
            const userAuth = await loginUserService(formValues);
            login(userAuth);
            navigate('/');
            toast.success(<div>Bienvenid@ a P2P MarketPlace 🤗<br/>
             ¡Aquí encontrarás lo que estás buscando! 😁</div>);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const handleChange = (event) => {
        const newFormValues = event.target.value;

        setFormValues({
            ...formValues,
            [event.target.name]: newFormValues
        });
    };

    return (
        <>
            <HeaderSecond />
            <main className='login-main'>
                <section className="login-section">
                    <div className='login-image-container'>
                        <img src={LogInImage} alt="Imagen" className='login-image'/>
                    </div>
                    <div className='login-form-container'>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <GeneralInput placeholder={'correo@ejemplo.com'} type={'email'} value={'email'} handleChange={handleChange} />
                            <Password value={'password'} handleChange={handleChange} placeholder={'Contraseña'} />
                            <MainButton text={'Iniciar sesión'}></MainButton>
                        </form>
                        <div className='no-account'>
                            <p>¿Todavía no tienes cuenta?</p>
                            <Link to='/user/create' >Regístrate</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default LoginPage;
