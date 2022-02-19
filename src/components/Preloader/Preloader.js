import './Preloader.css'

const Preloader = (props) => {
    return (
        <>
        <span className={`preloader__nothingFoundMsg
        ${props.isNothingFound ? `preloader__nothingFoundMsg_active` : null}`}>
       по вашему запросу ничего не найдено
       </span>
        <div className={`preloader ${props.isLoading ? 'preloader_active' : null}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
        </>
    )
};

export default Preloader
