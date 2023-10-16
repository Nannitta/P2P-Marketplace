import { useContext } from 'react';
import { UserAuthContext } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import SliderOne from '../../assets/slider1.webp';
import SliderTwo from '../../assets/slider2.webp';
import SliderThree from '../../assets/slider3.webp';
import 'bootstrap/dist/css/bootstrap.min.css';

function UncontrolledExample () {
    const { token } = useContext(UserAuthContext);
    return (
        <Carousel>
            <Carousel.Item className='orange-container'>
                <img src={SliderOne} alt="Imagen" />
                <p>¡Los <span className='bold'>CLÁSICOS</span> nunca pasan de moda! Encuentra tus tesoros retro en nuetra tienda de juegos de segunda mano.</p>
                <Link to={'/search/?category=Retro'}><button>Descubrir</button></Link>
            </Carousel.Item>
            <Carousel.Item className='orange-container'>
                <img src={SliderTwo} alt="Imagen" />
                <p>¡Libera espacio y <span className="bold">GANA</span> dinero! <br/>Vende lo que no usas y dale otra vida a tus cosas.</p>
                {
                    token
                        ? <Link to={'/product/addProduct'}>
                            <button>Vende ya</button>
                        </Link>
                        : <Link to={'/user/login'}>
                            <button>Regístrate</button>
                        </Link>
                }
            </Carousel.Item>
            <Carousel.Item className='orange-container'>
                <img src={SliderThree} alt="Imagen" />
                <p>¡Haz espacio para lo <span className="bold">NUEVO</span> y descubre ofertas emocionantes! Compra y vende entre personas de manera <span className="bold">SENCILLA</span> y <span className="bold">SEGURA</span></p>
                <Link to={'/search'}><button>Compra ya</button></Link>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
