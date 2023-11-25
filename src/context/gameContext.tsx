import { useReducer, createContext, useMemo, ReactElement } from "react";

export type GameType = {
    gameIsOn: boolean
    time: number
    points: number,
}

const initGameState: GameType = {
    gameIsOn: false,
    time: 0,
    points: 0
}

const G_REDUCER_ACTION_TYPE = {
    START_GAME: " START_GAME",
    UPDATE_TIME: "UPDATE_TIME",
    UPDATE_POINTS: "UPDATE_POINTS",
    FINISH_GAME: "FINISH_GAME",
    RESET_GAME: "RESET_GAME",
}

export type ReducerActionType = typeof G_REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: number
}

const reducer = (state: GameType, action: ReducerAction): GameType => {
    switch (action.type) {
        case G_REDUCER_ACTION_TYPE.START_GAME:{
            return {...state, gameIsOn: true}
        }
        case G_REDUCER_ACTION_TYPE.UPDATE_TIME:{
            const newTime = state.time + 1
            return {...state, time: newTime}
        }
        case G_REDUCER_ACTION_TYPE.UPDATE_POINTS:{
            if (!action.payload){
                throw new Error('no action.payload in gameContext UPDATE_POINTS')
            }
            const newPoints = action.payload
            const updatedPoints = newPoints + state.points
            return {...state, points: updatedPoints}
        }
        case G_REDUCER_ACTION_TYPE.FINISH_GAME:{
            return {
                    ...state,
                    gameIsOn: false,
                }
        }
        case G_REDUCER_ACTION_TYPE.RESET_GAME:{
            return {
                    gameIsOn: false,
                    time: 0,
                    points: 0
                }
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useGameContext = (initGameState: GameType) => {
    const [state, g_dispatch] = useReducer(reducer, initGameState)

    const G_REDUCER_ACTIONS = useMemo(() => {
        return G_REDUCER_ACTION_TYPE
    }, [])

    const game = state
    return { g_dispatch, game, G_REDUCER_ACTIONS}
}

export type UseGameContextType = ReturnType<typeof useGameContext>

const initGameContextState: UseGameContextType = {
    g_dispatch: () => { },
    G_REDUCER_ACTIONS: G_REDUCER_ACTION_TYPE,
    game: {
        gameIsOn: false,
        time: 0,
        points: 0
    },
}

const GameContext = createContext<UseGameContextType>(initGameContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const GameProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <GameContext.Provider value={useGameContext(initGameState)}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext 