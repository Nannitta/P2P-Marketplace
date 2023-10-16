import github from '../../assets/github.svg';

const Footer = () => {
    return (
        <footer>
            <p>Copyright © 2023 Player2Player - Todos los derechos reservados</p>
            <a href="https://github.com/AlejandroPachec/Player2Player" rel='noreferrer' target='_blank' title='Github'>
                <img src={github} alt="link al repositorio del github" /></a>
        </footer>
    );
};

export default Footer;
