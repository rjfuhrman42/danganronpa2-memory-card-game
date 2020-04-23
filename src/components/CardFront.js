import React from "react"

function CardFront({character}) {
    return (
        <div className="front" style={{backgroundImage: `url(${character})`}}>
            {/* <img src={character} className="card-front-image"></img> */}
        </div>
    )
}

export default CardFront