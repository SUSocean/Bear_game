import { useReducer, createContext, useMemo, ReactElement } from "react";

export type BlockType = {
    column : number,
    row: number
}

type BlocksStateType = BlockType[]

const initBlocksState: BlocksStateType = []

const B_REDUCER_ACTION_TYPE = {   
    ADD_BLOCK: "ADD_BLOCK",
    REMOVE_BLOCK: "REMOVE_BLOCK",
    MOVE_BLOCKS: "MOVE_BLOCKS"
}

export type ReducerActionType = typeof B_REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: string | BlockType
}

const reducer = (state: BlocksStateType, action: ReducerAction): BlocksStateType => {
    switch (action.type) {
        case B_REDUCER_ACTION_TYPE.ADD_BLOCK: {
            if (!action.payload || typeof action.payload === 'string'){
                throw new Error('action.payload mist be BlockType')
            }
            const newBlock: BlockType = action.payload
            return [...state, newBlock]
        }

        case B_REDUCER_ACTION_TYPE.REMOVE_BLOCK: {

            const filteredBlocks: BlockType[] = state.filter(block => block.row  < 9)

            return [...filteredBlocks]
        }

        case B_REDUCER_ACTION_TYPE.MOVE_BLOCKS: {

            const movedBlocks: BlockType[] = state.map(block => ({...block, row: block.row + 1}))

            return [...movedBlocks]
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useBlocksContext = (initBlocksState: BlocksStateType) => {
    const [state, b_dispatch] = useReducer(reducer, initBlocksState)

    const B_REDUCER_ACTIONS = useMemo(() => {
        return B_REDUCER_ACTION_TYPE
    }, [])

    const blocks = state
    return { b_dispatch, blocks, B_REDUCER_ACTIONS}
}

export type UseBlocksContextType = ReturnType<typeof useBlocksContext>

const initBlocksContextState: UseBlocksContextType = {
    b_dispatch: () => { },
    B_REDUCER_ACTIONS: B_REDUCER_ACTION_TYPE,
    blocks: [],
}

const BlocksContext = createContext<UseBlocksContextType>(initBlocksContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const BlocksProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <BlocksContext.Provider value={useBlocksContext(initBlocksState)}>
            {children}
        </BlocksContext.Provider>
    )
}

export default BlocksContext 