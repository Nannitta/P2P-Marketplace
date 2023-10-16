import { useEffect, useState } from 'react';
import { getUserProfileService, getUserReviewsService } from '../service';

function useGetUserProfile (idUser) {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                const data = await getUserProfileService(idUser);
                const reviews = await getUserReviewsService(idUser);

                setUser(data);
                setUserReviews(reviews);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [idUser]);

    return { user, error, loading, userReviews };
}

export default useGetUserProfile;
