import PropTypes from 'prop-types';

const SearchCategoryItem = ({ categoryText, onClick }) => {
    return (
        <button onClick={() => onClick(categoryText)}>
            <img src={`/src/assets/${categoryText}.svg`} alt={categoryText} />
            <p>{categoryText}</p>
        </button>
    );
};

SearchCategoryItem.propTypes = {
    categoryText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SearchCategoryItem;
