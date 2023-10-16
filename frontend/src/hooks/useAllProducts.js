import { useState, useEffect } from 'react';
import { getAllProductsService } from '../service';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const useAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const data = await getAllProductsService();

                setProducts(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};

export default useAllProducts;
