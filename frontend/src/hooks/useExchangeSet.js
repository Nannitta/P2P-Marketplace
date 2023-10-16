import { useEffect, useState } from 'react';
import { seeOrderByIdService } from '../service';

function useExchangeSet (token, idOrder) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderById, setOrderById] = useState(null);

    useEffect(() => {
        const loadExchangeSet = async () => {
            try {
                setLoading(true);
                const data = await seeOrderByIdService(token, idOrder);
                setOrderById(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadExchangeSet();
    }, [token, idOrder]);

    return { error, loading, orderById };
}

export default useExchangeSet;
