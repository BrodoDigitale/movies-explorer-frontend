import "./SectionHeader.css"


export function SectionHeader(props) {
    return(
        <div className="sectionHeader__wrapper">
            <h2 className="sectionHeader__text">{props.title}</h2>
        </div>
    )
}