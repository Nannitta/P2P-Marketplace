const verifyAccountEmail = (link) => {
    return (
        `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&display=swap"
                    rel="stylesheet"
                />
            </head>
        
            <div align="center">
                <body style="background-color: #252422; width: 700px; padding: 2rem">
                    <header>
                        <div align="left">
                            <img src="https://i.postimg.cc/7L4PtmJn/1.png" border="0" alt="1" />
                        </div>
                    </header>
                    <main>
                        <img
                            src="https://i.postimg.cc/MTCcXsBg/press-Start.gif"
                            border="0"
                            alt="press-Start"
                        />
                        <div align="left">
                            <p
                                style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #fffcf2;
                                    font-weight: 800;
                                    margin: 0;
                                    font-size: 1.5rem;
                                "
                            >
                                ESTAMOS A SOLO UN PASO
                            </p>
                        </div>
                        <div align="left">
                            <p
                                style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #eb5e28;
                                    font-weight: 800;
                                    margin: 0;
                                    font-size: 1.5rem;
                                "
                            >
                                VERIFICA TU CUENTA DE EMAIL
                            </p>
                        </div>
                        <div align="left">
                            <p
                                style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #fffcf2;
                                    font-weight: 400;
                                "
                            >
                                Para completar tu perfil y poder disfrutar de las ofertas de otros
                                vendedores o ganar dinero por lo que ya no usas, necesitas verificar
                                tu cuenta de correo.
                            </p>
                        </div>
                        <button
                            style="
                                border: none;
                                border-radius: 2.5rem;
                                padding: 1rem 2rem;
                                color: #fffcf2;
                                font-family: 'Poppins', sans-serif;
                                font-weight: 800;
                                font-size: 1.3rem;
                                background: linear-gradient(180deg, #eb5e28 0%, #ff922e 100%);
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                            "
                        >
                            <a href="${link}" style="color: #fffcf2; text-decoration: none"
                                >Verifica tu cuenta</a
                            >
                        </button>
                    </main>
                    <footer>
                        <p
                            style="
                                color: #fffcf2;
                                font-family: 'Poppins', sans-serif;
                                font-size: 0.8rem;
                                text-align: center;
                            "
                        >
                            Copyright © 2023 Player2Player - Todos los derechos reservados
                        </p>
                    </footer>
                </body>
            </div>
        </html>
        `
    );
};

module.exports = verifyAccountEmail;
