import { v4 as uuidv4 } from 'uuid';
import {useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom";
import { BlockType } from "../context/blocksContext"
import GameContext from '../context/gameContext';

type PropsType = {
    blocks: BlockType[],
    playerPos: number
}

const Road = (props: PropsType) => {

    
    const {g_dispatch, G_REDUCER_ACTIONS, game} = useContext(GameContext)

    const navigate = useNavigate()
    const {blocks, playerPos} = props

    useEffect(()=>{
        blocks.every(block => {
            if (block.row === 8){
                if (block.column === playerPos){
                    g_dispatch({type: G_REDUCER_ACTIONS.FINISH_GAME})
                    navigate('/gameover')
                }
            }
        })
    }, [])


    const blocksHTML = blocks.map(block => {
        const styles = {
            top: `calc(100vh - (100vh / 10) * ${10 - block.row + 1})`,
            left: `${
                block.column === 1? `calc(50% - ${block.row*5}% + 5%)`
                : block.column === 3? `calc(50% + ${block.row*5}% - 10%)`
                : `calc(50% - 50px)`    
            }`,
            scale: `${0.1 * block.row}`,
            width: `100px`,
            height: `100px`,
            position: `absolute` as 'absolute',
        }

        return(
            <div key={uuidv4()} style={styles}>
                {
                    block.column === 1 ? 
                    <svg id='bee_left_column' width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56.5 64.5L146.5 64L115 114H17L56.5 64.5Z" fill="#FFB800"/>
                    <path d="M115 114L146.5 64L148.5 105L115 160V114Z" fill="#E3A609"/>
                    <path d="M17 114H115V160H17V114Z" fill="#E7A808"/>
                    <path d="M77.7398 133.316L104.962 120.709L109.036 133.148L84.5919 144.469L77.7398 133.316Z" fill="#1E1E1E"/>
                    <path d="M27.4638 121L54.6855 133.609L47.8329 144.761L23.3889 133.439L27.4638 121Z" fill="#1E1E1E"/>
                    <path id='rwing_right' d="M50.2291 49H105.5L76.8462 90H18L50.2291 49Z" fill="#BFDBF7"/>
                    <path id='rwing_left' d="M115.299 49H171L145.942 90H87L115.299 49Z" fill="#BFDBF7"/>
                    </svg>

                    
                    : block.column === 2? 
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 55H146L152 113H54L60 55Z" fill="#FFB800"/>
                    <path d="M54 113H152L147 159H59L54 113Z" fill="#E7A808"/>
                    <path d="M114.74 132.316L141.962 119.709L146.036 132.148L121.592 143.469L114.74 132.316Z" fill="#1E1E1E"/>
                    <path d="M64.4638 120L91.6855 132.609L84.8329 143.761L60.3889 132.439L64.4638 120Z" fill="#1E1E1E"/>
                    <path id='wing_right' d="M41.5 40H97L97.8462 91H39L41.5 40Z" fill="#BFDBF7"/>
                    <path id='wing_left' d="M107 40H161L167 91H108.154L107 40Z" fill="#BFDBF7"/>
                    </svg>
                    
                    : 
                    <svg id='right_column' width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56.5 64.5L146.5 64L115 114H17L56.5 64.5Z" fill="#FFB800"/>
                    <path d="M115 114L146.5 64L148.5 105L115 160V114Z" fill="#E3A609"/>
                    <path d="M17 114H115V160H17V114Z" fill="#E7A808"/>
                    <path d="M77.7398 133.316L104.962 120.709L109.036 133.148L84.5919 144.469L77.7398 133.316Z" fill="#1E1E1E"/>
                    <path d="M27.4638 121L54.6855 133.609L47.8329 144.761L23.3889 133.439L27.4638 121Z" fill="#1E1E1E"/>
                    <path id='rwing_right' d="M50.2291 49H105.5L76.8462 90H18L50.2291 49Z" fill="#BFDBF7"/>
                    <path id='rwing_left' d="M115.299 49H171L145.942 90H87L115.299 49Z" fill="#BFDBF7"/>
                    </svg>
                    
                }

            </div>
        )
    })
    return (
        <div className="road">
            <div className='values'>
                <p><span className='road_sub-title'>time </span><span className='road_value'>{game.time}</span></p>
                <p><span className='road_sub-title'>points </span><span className='road_value'>{game.points}</span></p>
            </div>
            <div className="road_bg"></div>
                {blocksHTML}
        </div>
    )
}

export default Road