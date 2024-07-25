
interface HeaderProps {
    label : string
}

export const Header = ({label}:HeaderProps)=>{
    return(
        <div>
            <h1>
                Auth
            </h1>
            <p>{label}</p>
        </div>
    )
}