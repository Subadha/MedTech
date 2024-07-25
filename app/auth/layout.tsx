
export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="h-full flex justify-center items-center bg-sky-500">
            {children}
        </div>
    )
}