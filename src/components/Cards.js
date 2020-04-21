import React, { useState, useEffect } from "react"
import Card from "./Card"
import images from "../images"

function Cards () {
    const STARTING_TIME = 90
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [time, setTime] = useState(STARTING_TIME)

    useEffect(() => {
        setupGame()
    }, [])

    useEffect(() => {
        if(flippedCards.length === 2) {
            setTimeout(() => {
                let firstImage = cards[flippedCards[0]] 
                let secondImage = cards[flippedCards[1]]

                setTurns(prev => prev + 1)

                if(firstImage === secondImage) {
                    setMatchedCards([...matchedCards, flippedCards[0], flippedCards[1]])
                    setFlippedCards([])
                }
                else {
                    setFlippedCards([])
                }
            }, 500)
        }
    }, [flippedCards])

    useEffect(() => {

        if(matchedCards.length === images.length * 2) 
        setPlaying(false)

    }, [matchedCards])

    useEffect(() => {
        if(playing && time > 0) 
        {
            setTimeout(() => setTime(prev => prev - 1), 1000)
        }
        else if (time === 0)
        {
            setPlaying(false)
        }
    }, [time, playing])

    function handleClick(id) {

        if(!playing) {
            setPlaying(true)
        }
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

    function setupGame() {
        let array = [...images, ...images]                           // double the images array, so that we have two of each card)

        array = shuffle(array)

        setCards(array) 
        setMatchedCards([])
        setFlippedCards([])          
        setTurns(0)
        setTime(STARTING_TIME)
    }

    function winGame() {
        let matches = []
        cards.forEach((card, index) => matches.push(index))
        setMatchedCards(matches)
    }

    if(time > 0 && matchedCards.length < images.length * 2)
    return (
        <div className={'cards-grid'}>
            {console.log(matchedCards.length, images.length*2)}
           { cards.map((image, index) => (
                <Card front={image} 
                      flipped={flippedCards.includes(index)}
                      handleClick={handleClick}
                      matched={matchedCards.includes(index)}
                      id={index}
                />
                )
            )}
            <div className="game-menu">
                <p>{playing ? `TIME: ${time} TURNS:${turns}` : "CLICK A CARD TO START..."}</p>
            </div>
            <button onClick={() => winGame()}>WIN!</button>
        </div>
    )
    else return (
        <div className="game-over-display">
            <h1>{matchedCards.length === images.length * 2 ? 'YOU WIN!' : 'TIMES UP!'}</h1>
            <h1>TURNS: {turns}</h1>
            <h1>TIME: {STARTING_TIME - time}</h1>
            <button onClick={setupGame}>PLAY AGAIN?</button>
        </div>
    )
}

export default Cards