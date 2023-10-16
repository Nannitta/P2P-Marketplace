import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../../service';
import { toast } from 'react-toastify';
import HeaderSecond from '../../components/header-second/HeaderSecond';
import Footer from '../../components/footer/Footer';
import GeneralInput from '../../components/generalInput/GeneralInput';
import Password from '../../components/password/Password';
import MainButton from '../../components/main-button/MainButton';
import './registerPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        pass2: ''
    });

    function handleChange (event) {
        const newFormValues = event.target.value;

        setFormValues({
            ...formValues,
            [event.target.name]: newFormValues
        });
    }

    async function handleSubmit (event) {
        event.preventDefault();

        if (formValues.password !== formValues.pass2) {
            toast.error('Los campos de contraseña no coinciden');
        }

        try {
            await registerUserService(formValues);
            navigate('/user/login');
            toast.success(`Te has registrado correctamente. Player ${formValues.firstName} ready! 🎮`);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <HeaderSecond/>
            <main>
                <div className="register-form-container">
                    <h1>Registro</h1>
                    <form onSubmit={handleSubmit} className='register-form'>
                        <div className="group-input-register">
                            <GeneralInput type={'text'} value={'firstName'} placeholder={'Nombre'} handleChange={handleChange}/>
                            <GeneralInput type={'text'} value={'lastName'} placeholder={'Primer apellido'} handleChange={handleChange}/>
                        </div>
                        <div className='group-input-register'>
                            <GeneralInput type={'phone'} value={'phone'} placeholder={'Teléfono'} handleChange={handleChange}/>
                            <GeneralInput type={'email'} value={'email'} placeholder={'correo@ejemplo.com'} handleChange={handleChange}/>
                        </div>
                        <div className='group-input-register'>
                            <Password value={'password'} handleChange={handleChange} placeholder={'Contraseña'}/>
                            <Password value={'pass2'} handleChange={handleChange} placeholder={'Repetir contraseña'}/>
                        </div>
                        <MainButton type='submit' text={'Registrarse'}/>
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default RegisterPage;
