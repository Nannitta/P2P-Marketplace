import { Link } from 'react-router-dom';
import signInAvatar from '../../assets/singIn.svg';

function NoLoggedInAvatar () {
    return (
        <Link to='/user/login'><img src={signInAvatar} alt="sign in avatar"/></Link>
    );
}

export default NoLoggedInAvatar;
