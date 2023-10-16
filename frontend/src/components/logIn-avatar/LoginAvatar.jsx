import { UserAuthContext } from '../../context/UserAuthContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import defaultAvatar from '../../assets/defaultAvatar.webp';
import './styles.css';

const LoginAvatar = () => {
    const { user, logout } = useContext(UserAuthContext);
    const [navigate, setNavigate] = useState(null);
    const open = Boolean(navigate);
    const name = user.firstName ? user.firstName : user.first_name;
    const lastName = user.lastName ? user.lastName : user.last_name;
    const handleClick = (event) => {
        setNavigate(event.currentTarget);
    };
    const handleClose = () => {
        setNavigate(null);
    };

    return (
        <>
            <div>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <div className='edited-avatar'>
                        <p>{name} {lastName[0]}.</p>
                        {
                            user.avatar
                                ? <div className='edited-avatar-container'>
                                    <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${user.avatar}`} alt="Foto de perfil" />
                                </div>
                                : <div className='edited-avatar-container'>
                                    <img src={defaultAvatar} alt='Avatar por defecto'/>
                                </div>
                        }
                    </div>
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button'
                    }}
                    anchorEl={navigate}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <Link to={'/product/addProduct'}>
                        <MenuItem onClick={handleClose}>Añadir producto</MenuItem>
                    </Link>
                    <Link to={'/user/edit'}>
                        <MenuItem onClick={handleClose}>Editar perfil</MenuItem>
                    </Link>
                    <Link to={`/user/profile/${user.id}`}>
                        <MenuItem onClick={handleClose}>Ver perfil</MenuItem>
                    </Link>
                    <Link to={`/user/orders/${user.id}`}>
                        <MenuItem onClick={handleClose}>Gestionar ventas</MenuItem>
                    </Link>
                    <Link to={'/user/orders'}>
                        <MenuItem onClick={handleClose}>Ver pedidos</MenuItem>
                    </Link>
                    <Link to={'/'}>
                        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                    </Link>
                </Menu>
            </div>

        </>
    );
};

export default LoginAvatar;
