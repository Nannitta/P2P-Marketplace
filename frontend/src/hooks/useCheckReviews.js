import { useEffect, useState } from 'react';
import { getUserReviewsService } from '../service';

function useCheckReviews (idUser) {
    const [alreadyReviewed, SetAlreadyReviewed] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);

                const data = await getUserReviewsService(idUser);

                SetAlreadyReviewed(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [idUser]);

    return { alreadyReviewed, error, loading };
}

export default useCheckReviews;
