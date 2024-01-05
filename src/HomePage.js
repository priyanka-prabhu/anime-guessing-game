import * as React from 'react';
import './HomePage.css';

function HomePage(){

    const [hasGameStarted, setHasGameStarted] = React.useState(false)
    const [generatedQuote, setGeneratedQuote] = React.useState(null)
    const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(null)
    const [generatedAnime, setGeneratedAnime] = React.useState('')
    const [guessedAnime, setGuessedAnime] = React.useState('')
    const [hint, sethint] = React.useState('')
    const [showAnswer, setShowAnswer]= React.useState(false)
    function startGame(){
        setHasGameStarted(true);
        getRandomQuotes();
    }
    function getRandomQuotes(){
        setGuessedAnime('')
        setIsCorrectAnswer(null)
        setShowAnswer(false)
        fetch('https://animechan.xyz/api/random')
        .then((response)=>response.json())
        .then((quote)=>{
            setGeneratedAnime(quote.anime)
            setGeneratedQuote(quote.quote)
            sethint(quote.character)
        })
    };

    function checkCorrectness(){
        guessedAnime.toLowerCase() === generatedAnime.toLowerCase() ?
         setIsCorrectAnswer('yes') : generatedAnime.toLowerCase().includes(guessedAnime.toLowerCase()) && guessedAnime !== '' 
         ? setIsCorrectAnswer('close'): setIsCorrectAnswer('no');
    }

    return (
       <div className='game_card'>
        <h1>Guess the anime</h1>
        {hasGameStarted === false ? <button onClick={startGame}>Start Now</button>: 
            <div>
                <p>{generatedQuote}</p>
                <input type='text' value={guessedAnime} onChange={(e)=>{setGuessedAnime(e.target.value)}} className={isCorrectAnswer === 'no' && guessedAnime.trim() === '' ? 'empty-input' : ''}/>
                <button onClick={checkCorrectness}>Check your answer</button>
                <button onClick={getRandomQuotes}>Try A New One!</button>
                <button onClick={()=>{setShowAnswer(true)
                setIsCorrectAnswer(null)}}>Show Answer</button>
                {!showAnswer ? 
                isCorrectAnswer === 'yes' ? (
                    <p className="result-text correct">Your guess is correct</p>
                    ) : isCorrectAnswer === 'close' ? (
                    <p className="result-text partially-correct">Your guess is partially correct</p>
                    ) : isCorrectAnswer === 'no' ? (
                    <div>
                    <p className="result-text wrong">Your guess is wrong</p>
                    <p>Here's a hint: The character who said this is {hint}</p>
                    </div>
                    ) : null : <p>{generatedAnime}</p>}
            </div>    
        }

       </div> 
    )
}

export default HomePage;