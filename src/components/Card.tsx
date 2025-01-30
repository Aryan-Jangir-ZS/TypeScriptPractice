import React from "react";
import "../Pagination.css"
interface Props {
    id:number,
    title:string,
    images:string,

}
const Card:React.FC<Props> = ({ id , title , images }) => {
    

    return (
        <div className = "card">
                <div >
                <img className="img" src={images} alt={title}></img>
                </div>
                <p>{id}{"  "}{title}</p>

        </div>
    )
}

export default Card;