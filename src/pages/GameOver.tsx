import {useContext, useEffect} from 'react'
import GameContext from '../context/gameContext'
import {useNavigate} from "react-router-dom";


const GameOver = () => {
    const {game} = useContext(GameContext)
    const navigate = useNavigate()
    const resetGame = () => {
        navigate('/')
        navigate(0)
    }
    useEffect(() =>{
        (document.getElementById('time') as HTMLInputElement).textContent = `${game.time}`;
        (document.getElementById('score') as HTMLInputElement).textContent = `${game.points}`;
    }, [])
    return (
        <div className='gameover'>
            <h1 className='gameover_headline'>Game Over</h1>
            <div>
            <p><span className='gameover_sub-title'>time </span><span className='road_value' id='time'></span></p>
            <p><span className='gameover_sub-title'>points </span><span className='road_value' id='score'></span></p>
            </div>
            <button onClick={resetGame}>OK</button>
        </div>
    )
}

export default GameOver