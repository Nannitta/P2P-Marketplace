import HomePageHeader from './HomePageHeader';
import Slider from './Slider';
import ProductsList from './ProductsList';
import Footer from '../../components/footer/Footer';
import './styles/sliderStyles.css';
import './styles/headerStyles.css';
import './styles/searchBarStyles.css';
import './styles/productListStyles.css';
import './styles/homePageStyles.css';
import '../../components/footer/footer.css';

function HomePage () {
    return (
        <>
            <HomePageHeader />
            <main>
                <section className='slider-section'>
                    <h1>Juega más, paga menos</h1>
                    <Slider/>
                </section>
                <section className='products-section'>
                    <h2>Lo mejor, al mejor precio</h2>
                    <ProductsList />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
