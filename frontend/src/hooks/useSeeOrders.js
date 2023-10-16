import { useEffect, useState } from 'react';
import { seeOrdersService } from '../service';

function useSeeOrders (token) {
    const [orders, setOrders] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const data = await seeOrdersService(token);

                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, [token]);

    return { orders, error, loading };
}

export default useSeeOrders;
