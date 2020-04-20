import React, {useState} from "react"
import CardFront from "./CardFront"
import CardBack from "./CardBack"

function Card({front, handleClick, flipped, id, matched}) {
    
    var class_name = matched ? 'card matched' : 
                     flipped ? 'card flipped' : 'card'

    return (
        <div className={class_name} onClick={() => handleClick(id)} id={id}>
            <div className="content">
                <CardBack />
                <CardFront character={front}/>
            </div>
        </div>
    )
}

export default Card