import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSearchProducts from '../../hooks/useSearchProducts';
import Loading from '../../components/loading/Loading';
import HomePageHeader from '../home-page/HomePageHeader';
import Footer from '../../components/footer/Footer';
import ProductItem from '../../components/product-item/ProductItem';
import './searchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const { products, loading, error } = useSearchProducts(new URLSearchParams(location.search));

    if (loading) return <Loading/>;
    if (error) return toast.error(error);

    return (
        <>
            <HomePageHeader/>
            <main className='search-page-main'>
                <h1>Productos seleccionados</h1>
                {
                    products.length
                        ? <ul>
                            {products.filter((product) => product.availability === 1).map((product) => {
                                return <li key={product.product_id}><ProductItem product={product}/></li>;
                            })}
                        </ul>
                        : <p>No se han encontrado productos</p>
                }
            </main>
            <Footer/>
        </>
    );
};

export default SearchPage;
