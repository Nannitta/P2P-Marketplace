import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/defaultAvatar.webp';
import './userWithRating.css';

const UserWithRating = ({ username, lastName, avatar, idUser }) => {
    return (
        <Link to={`/user/profile/${idUser}`}>
            <div>
                {
                    avatar
                        ? <div className='container-profile-avatar'>
                            <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${avatar}`} alt="Foto de perfil" className='profile-avatar'/>
                        </div>
                        : <div className='container-profile-avatar'>
                            <img src={defaultAvatar} alt='Avatar por defecto'/>
                        </div>
                }
                <p>{username} {lastName}</p>
            </div>
        </Link>
    );
};

UserWithRating.propTypes = {
    username: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
    idUser: PropTypes.string
};

export default UserWithRating;
