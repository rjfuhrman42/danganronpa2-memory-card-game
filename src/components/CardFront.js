import React from "react"

function CardFront({character}) {
    return (
        <div className="front">
            <img src={character} className="card-front-image"></img>
        </div>
    )
}

export default CardFront