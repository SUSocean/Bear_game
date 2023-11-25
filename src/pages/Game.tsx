import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import {useContext, useEffect, useState} from "react"
import { WordType } from "../context/wordsContext"
import { BlockType } from "../context/blocksContext";

import WordsContext from "../context/wordsContext"
import BlocksContext from "../context/blocksContext";
import GameContext from "../context/gameContext";

import WordsList from "../components/WordsList"
import Bear from "../components/Bear";
import Road from "./Road";

const Game = () => {
    const {dispatch, REDUCER_ACTIONS, words} = useContext(WordsContext)
    const {b_dispatch, B_REDUCER_ACTIONS, blocks} = useContext(BlocksContext)
    const {g_dispatch, G_REDUCER_ACTIONS, game} = useContext(GameContext)

    const assignWordToGame = () => {dispatch({type: REDUCER_ACTIONS.ASSIGN_IN_GAME})}

    const createBlock = () => {
        const newBlock: BlockType = {
            column: Math.floor(Math.random() * 3) + 1,
            row: 1
        }
        b_dispatch({
            type: B_REDUCER_ACTIONS.ADD_BLOCK,
            payload: newBlock
        })
    }
    const moveBlocks = () => {b_dispatch({type: B_REDUCER_ACTIONS.MOVE_BLOCKS})}
    const cleanBlocks = () => {b_dispatch({type: B_REDUCER_ACTIONS.REMOVE_BLOCK})}
    

    const gameOn = () => {g_dispatch({type: G_REDUCER_ACTIONS.START_GAME})}
    const updateTimer = () => {g_dispatch({type: G_REDUCER_ACTIONS.UPDATE_TIME})}
    const updatePoints = (points: number) => {g_dispatch({type: G_REDUCER_ACTIONS.UPDATE_POINTS, payload: points})}

    const [playerInput, setPlayerInput] = useState<string>('')
    const [playerPosition, setPlayerPosition] = useState<number>(2)

    let time: number = 0
    let level: number = 5
    const gameTimer = () => {
        let spawnTimeOut: number = 5
        setInterval(()=>{
            updateTimer()
            if (time%60 === 0){
                level = level === 1? 1 : level - 1
            }
            if (spawnTimeOut < 1){
                createBlock()
                spawnTimeOut = level
                moveBlocks()
                cleanBlocks()
                spawnTimeOut = 5
            }
            spawnTimeOut--
            const points = 10 - level
            updatePoints(points)
        }, 1000)
    }

    const startGame = async () => {
        const res = await axios.get(
            "https://random-word-api.herokuapp.com/word?number=10"
        );
        const data = res.data
        
        
        await data.forEach((element: string) => {
            let newWord: WordType = {
                letters: [],
                id: uuidv4(),
                isInGame: false,
                isInFocus: false,
                column: null
            }
            for (let i = 0; i < element.length; i++){
                newWord.letters.push({
                    letter: element[i],
                    correct: null,
                    position: i === 0? 'current' : 'next'})
                }
                
                dispatch({
                    type: REDUCER_ACTIONS.ADD_WORD,
                    payload: newWord,
                });
        });

        assignWordToGame();
        gameOn()
        gameTimer()
    };

    const newWordProcedure = async (word: WordType) => {
        dispatch({
            type: REDUCER_ACTIONS.REMOVE_WORD,
            payload: word,
        });

        assignWordToGame();

        const res = await axios.get(
            "https://random-word-api.herokuapp.com/word"
        );
        const data = res.data
        
        await data.forEach((element: string) => {
            let newWord: WordType = {
                letters: [],
                id: uuidv4(),
                isInGame: false,
                isInFocus: false,
                column: null
            }
            for (let i = 0; i < element.length; i++){
                newWord.letters.push({
                    letter: element[i],
                    correct: null,
                    position: i === 0? 'current' : 'next'})
                }
                
                dispatch({
                    type: REDUCER_ACTIONS.ADD_WORD,
                    payload: newWord,
                });
            
        });

    }

    const handleInput = (letter: string) => {
        const activeWords: WordType[] = words.filter(word => word.isInGame === true)
        const wordInfocus: WordType | undefined = activeWords.find(w => w.isInFocus === true)
        if (!wordInfocus){
            activeWords.forEach(w=> {
                if (w.letters[0].letter === letter){
                    dispatch({type: REDUCER_ACTIONS.REGISTER_INPUT, payload: {id: w.id, letter: letter}})
                }
            })
        } else {
            dispatch({type: REDUCER_ACTIONS.REGISTER_INPUT, payload: {id: wordInfocus.id, letter: letter}})
            if (wordInfocus.letters[wordInfocus.letters.length - 1].letter === letter && wordInfocus.letters[wordInfocus.letters.length - 1].position === 'current'){
                newWordProcedure(wordInfocus)
                if (wordInfocus.column){
                    if (playerPosition === wordInfocus.column){
                        g_dispatch({
                            type: G_REDUCER_ACTIONS.UPDATE_POINTS,
                            payload: 100,
                        });
                    }
                    setPlayerPosition(wordInfocus.column)
                }
            }
        }
    }

    useEffect(() => {
        startGame();
    }, []);
    return (
        <>
        <div className="game_screen">
            <button onClick={createBlock}>new block</button>

            <Road key={uuidv4()} blocks = {blocks} playerPos={playerPosition}/>
            <Bear pos={playerPosition}/>
            {game.gameIsOn && <WordsList key={uuidv4()}/>}
            {!game.gameIsOn && <span>loading</span>}
        </div>
        <input 
            className="input"
            autoFocus 
            value={playerInput}
            onKeyDown={(e)=> {
                setPlayerInput(e.key)
            }}
            onChange={() => {
                handleInput(playerInput)
            }}
        />
        </>
    )
}

export default Game