import "./SectionHeader.css"


export function SectionHeader(props) {
    return(
        <div className={`sectionHeader ${props.modificator}`}>
            <h2 className={`sectionHeader__text ${props.modificator}`}>{props.title}</h2>
        </div>
    )
}