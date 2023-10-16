import { useState } from 'react';
import PropTypes from 'prop-types';
import openEye from '../../assets/openEye.svg';
import closedEye from '../../assets/closeEye.svg';
import './password.css';

function Password ({ placeholder, value, handleChange }) {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility () {
        setShowPassword(!showPassword);
    }


    return (

        <label>
            <input
                type={showPassword ? 'text' : 'password'}
                className='password'
                placeholder={placeholder}
                name={value}
                id={value}
                onChange={handleChange}
                autoComplete='current-password'/>
            <button
                type='button'
                className='eye-button'
                onClick={togglePasswordVisibility}
            ><img src={showPassword ? closedEye : openEye} alt="lock and unlock icons" /></button>
        </label>

    );
}

Password.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default Password;
