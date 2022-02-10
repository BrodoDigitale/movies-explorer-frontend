import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className={`preloader ${props.isLoading ? 'preloader_active' : null}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
