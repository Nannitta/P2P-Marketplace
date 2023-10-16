import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const localStorageUser = localStorage.getItem('user');
        return localStorageUser ? JSON.parse(localStorageUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || '';
    });
    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }, [token, user]);

    const logout = () => {
        setToken('');
        setUser(null);
    };

    const login = (userAuth) => {
        setToken(userAuth[0]);
        setUser(userAuth[1]);
    };
    const updateUser = (token, newUser) => {
        setToken(token);
        setUser(prevUser => {
            const updatedUser = { ...prevUser };
            for (const [key, value] of Object.entries(newUser)) {
                if (value !== '') {
                    if (key !== 'password' && key !== 'phone' && key !== 'email' && key !== 'city' && key !== 'bio') {
                        updatedUser[key] = value;
                    }
                }
            }
            return updatedUser;
        });
    };
    return (
        <UserAuthContext.Provider value={{ token, user, login, logout, updateUser }}>
            {children}
        </UserAuthContext.Provider>
    );
};

UserAuthContextProvider.propTypes = {
    children: PropTypes.element.isRequired
};


export { UserAuthContext, UserAuthContextProvider };
