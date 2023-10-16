import LoadingGif from '../../assets/loading.gif';

const Loading = () => {
    return (
        <main>
            <img src={LoadingGif} alt="El gif cargando" />
            <p>Cargando</p>
        </main>
    );
};

export default Loading;
