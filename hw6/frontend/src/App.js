import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { guess, startGame, restart } from "./axios";


function App() {

    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    //const input = document.querySelector('input');
    //if (input){
        //input.addEventListener('input', update)
    //}


    const update = (e) => {
        setNumber(e.target.value)
    }

    const handleGuess = async () => {
        const response = await guess(number)
        //console.log(response)
        const a = document.querySelector('input');
        console.log(a.value)
        a.value = '';

        if (response === 'Equal') {
            setHasWon(true)
            setStatus('')
        }
        else {
            setStatus(response)
            //setNumber('')
        }
    }

    const startMenu =
        <div>
            <button onClick={async () =>
                await startGame() && setHasStarted(true)}> start game</button>
        </div>

    const gameMode =
        <>
            <p>Guess a number between 1 to 100</p>
            <input onChange={(e) => setNumber(e.target.value)}/>
            <button
                onClick={handleGuess}
                disabled={!number}
            >guess!</button>
            <p>{status}</p>
        </>

    const winningMode = (
        <>
            <p>you won! the number was {number}.</p>
            <button onClick={async() =>
            await restart() && setHasWon(false)}>restart</button>
        </>
    )

    const game =
        <div>
            {hasWon ? winningMode : gameMode}
        </div>

    return (
        <div className="App">
            {hasStarted ? game : startMenu}
        </div>
    );


}

export default App;
