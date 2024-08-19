import { FaPencilAlt } from "react-icons/fa";

export default function About(){
    return(
        <div className="flex flex-col gap-5 sm:w-[50vw]">
            <div>
                <h1 className="font-bold">About Me</h1>
            </div>
            <div className="flex border-2 rounded-lg bg-gray-200  p-7">
                <p className="w-[80vw] sm:w-[44vw]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt mollitia nam eveniet sunt quisquam? Vero cum illo eum culpa dicta voluptatum fugit hic sint tempore ipsum, aliquid aspernatur quasi at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis minus eum, incidunt ipsa molestiae, tempora harum error sed magni, dolore nihil temporibus provident consequatur repellat ab amet! Itaque, ad officia!</p>
                <FaPencilAlt />
            </div>
        </div>
    )
}