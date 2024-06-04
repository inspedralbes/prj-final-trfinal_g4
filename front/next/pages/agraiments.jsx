const Credits = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 via-red-700 to-yellow-500 p-8 text-white font-PixelFont">
            <h1 className="text-4xl font-bold mb-8">Chromatic Bond</h1>
            <div className="flex flex-col md:flex-row justify-around w-full mb-8">
                <div className="text-center mb-8 md:mb-0">
                    <h2 className="text-2xl font-semibold mb-4">Fet per:</h2>
                    <p>Fabián Roldán</p>
                    <p>Sara Martínez</p>
                    <p>Rubén Lora</p>
                    <p>Betsy Julie Villegas</p>
                    <p>Eric Gómez Vilà</p>
                </div>
                <div className="text-center mb-8 md:mb-0">
                    <h2 className="text-2xl font-semibold mb-4">Recursos:</h2>
                    <p>Tota la música feta per Suno AI (<a href="https://suno.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-300">https://suno.com/</a>)</p>
                    <p>Tots els Sprites fets per Pixel Frog (<a href="https://pixelfrog-assets.itch.io/" target="_blank" rel="noopener noreferrer" className="underline text-blue-300">https://pixelfrog-assets.itch.io/</a>)</p>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Agraiments:</h2>
                    <p>Danna Rodríguez</p>
                    <p>Judith Pascal</p>
                </div>
            </div>
            <h3 className="text-xl mt-8">Gràcies per jugar, prem espai per tornar al menú</h3>
        </div>
    );
};

export default Credits;
