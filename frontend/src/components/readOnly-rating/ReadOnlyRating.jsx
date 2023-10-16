import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';

const ReadOnlyRating = ({ value }) => {
    return (
        <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
    );
};

ReadOnlyRating.propTypes = {
    value: PropTypes.number
};

export default ReadOnlyRating;
