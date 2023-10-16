import { useState, useEffect } from 'react';
import { getSearchProductsService } from '../service';

const useSearchProducts = (params) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const data = await getSearchProductsService(params);

                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};

export default useSearchProducts;
