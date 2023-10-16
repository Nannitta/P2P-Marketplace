import PropTypes from 'prop-types';
import './generalInput.css';

function GeneralInput ({ placeholder, value, type, handleChange, min }) {
    return (
        <label>
            <input
                className='general-input'
                type={type}
                placeholder={placeholder}
                name={value}
                id={value}
                onChange={handleChange}
                autoComplete='off'
                min={min}
            />
        </label>
    );
}

GeneralInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    min: PropTypes.number
};

export default GeneralInput;
