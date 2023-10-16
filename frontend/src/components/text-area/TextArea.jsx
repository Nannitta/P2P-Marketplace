import PropTypes from 'prop-types';
import './textArea.css';

function TextArea ({ placeholder, value, handleChange }) {
    return (
        <label>
            <textarea
                className='textArea'
                placeholder={placeholder}
                name={value}
                id={value}
                onChange={handleChange}/>
        </label>
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default TextArea;
