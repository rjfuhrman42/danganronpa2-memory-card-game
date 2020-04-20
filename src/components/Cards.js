import React, { useState, useEffect } from "react"
import Card from "./Card"
import images from "../images"

function Cards () {

    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        let array = [...images, ...images]                           // double the images array, so that we have two of each card)

        array = shuffle(array)

        setCards(array)                                             // shuffle the cards on page load 
    }, [])

    useEffect(() => {
        if(flippedCards.length === 2) {
            setTimeout(() => {
                let firstImage = cards[flippedCards[0]] 
                let secondImage = cards[flippedCards[1]]

                if(firstImage === secondImage) {
                    setMatchedCards([...matchedCards, flippedCards[0], flippedCards[1]])
                    setFlippedCards([])
                }
                else {
                    setFlippedCards([])
                }
            }, 1000)
        }
    }, [flippedCards])

    useEffect(() => {

        if(matchedCards.length === images.length * 2) 
        setGameOver(true)

    }, [matchedCards])

    function handleClick(id) {
        // if less than two cards flipped, this card is not currently flipped, and this card has not already been successfully matched
        if(flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id))  
        {
            console.log(matchedCards)
            setFlippedCards([...flippedCards, id])
        }
        else return
    }

    function shuffle(arr) {
        let x, temp = arr

        for(let i = arr.length - 1; i > 0; i--)
        {
            const randNumber = Math.floor(Math.random() * (i + 1))  // Fisher-Yates
            x = temp[i]
            temp[i] = temp[randNumber]
            temp[randNumber] = x
        }
        
        return temp
    }

    function winGame() {
        let matches = []
        cards.forEach((card, index) => matches.push(index))
        setMatchedCards(matches)
    }

    if(gameOver)
    return (
        <h1>YOU WIN!</h1>
    )
    else return (
        <div className={'cards-grid'}>
           { cards.map((image, index) => (
                <Card front={image} 
                      flipped={flippedCards.includes(index)}
                      handleClick={handleClick}
                      matched={matchedCards.includes(index)}
                      id={index}
                />
                )
            )}
            <button onClick={() => winGame()}>WIN!</button>
        </div>
    )
}

export default Cards