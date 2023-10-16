import { useEffect, useState } from 'react';
import { getUserOrdersService } from '../service';

function useGetUserOrders (sellerUser, token) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const orders = await getUserOrdersService(sellerUser, token);
                setUserOrders(orders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [sellerUser, token]);

    return { error, loading, userOrders };
}

export default useGetUserOrders;
