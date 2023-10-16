import { useEffect, useState } from 'react';
import { getProductByIdService } from '../service';

function useGetProduct (idProduct) {
    const [article, setArticle] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);

                const data = await getProductByIdService(idProduct);

                setArticle(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [idProduct]);

    return { article, error, loading };
}

export default useGetProduct;
