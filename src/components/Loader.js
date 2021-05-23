import '../styles/loader.css';

function Loader(props) {
    return (
        <div className="loader-card">
            <div className="card-image">
                <div className="block pulsate">
                </div>
            </div>
            <div className="card-content">
                <div className="block2 pulsate">
                </div>
                <div className="block3 pulsate">
                </div>
                <div className="circle pulsate">
                </div>
                <div className='clear'></div>
            </div>
        </div>
    )
}

export default Loader;