import PropTypes from 'prop-types';
import './secondaryButton.css';

const SecondaryButton = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick} className='secondaryButton'>{text}</button>
    );
};

SecondaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func
};

export default SecondaryButton;
