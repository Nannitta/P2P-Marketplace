import PropTypes from 'prop-types';
import './mainButton.css';

const MainButton = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick} className='mainButton'>{text}</button>
    );
};

MainButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func
};

export default MainButton;
