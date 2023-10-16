import { toast } from 'react-toastify';
import useAllProducts from '../../hooks/useAllProducts';
import ProductItem from '../../components/product-item/ProductItem';
import Loading from '../../components/loading/Loading';


function ProductsList () {
    const { products, loading, error } = useAllProducts();

    if (loading) return <Loading />;
    if (error) return toast.error(error);

    return (
        products.length
            ? <ul className='product-list-home'>
                {products.filter((product) => product.availability === 1).map((product) => (
                    <li key={product.product_id}>
                        <ProductItem product={product} />
                    </li>
                ))}
            </ul>
            : <p>No hay ningún producto disponible</p>
    );
}

export default ProductsList;
