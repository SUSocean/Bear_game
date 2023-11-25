import { useReducer, createContext, useMemo, ReactElement } from "react";

type LetterType = {
    letter: string,
    correct: boolean | null,
    position: 'past' | 'current' | 'next'
}

export type WordType = {
    letters: LetterType[],
    id: string,
    isInGame: boolean,
    isInFocus: boolean,
    column: number | null
}

type WordsStateType = WordType[]

const initWordsState: WordsStateType = []

const REDUCER_ACTION_TYPE = {
    ADD_WORD: "ADD_WORD",
    REMOVE_WORD: "REMOVE_WORD",
    ASSIGN_IN_GAME: "ASSIGN_IN_GAME",
    REGISTER_INPUT: "REGISTER_INPUT",
    RESET_WORDS: "RESET_WORDS"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: WordType | {id: string, letter: string}
}


const reducer = (state: WordsStateType, action: ReducerAction): WordsStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD_WORD: {

            function isLetterPayload(payload: WordType | {id: string, letter: string}): payload is { id: string, letter: string } {
                return (payload as { id: string, letter: string }).letter !== undefined;
            }

            if (!action.payload || isLetterPayload(action.payload)) {
                throw new Error('action.payload missing')
            }
            const newWord: WordType = action.payload
            return [...state, newWord]
        }

        case REDUCER_ACTION_TYPE.REMOVE_WORD: {
            if (!action.payload) {
                throw new Error('action.payload missing or is wrong type in REMOVE action')
            }

            const {id} = action.payload

            const filteredWords: WordsStateType = state.filter(item => item.id !== id)

            return [...filteredWords]
        }
        
        case REDUCER_ACTION_TYPE.ASSIGN_IN_GAME: {
            let result: WordsStateType
            const wordsInGame = state.filter(word => word.isInGame === true);
            const availableLetters = new Set<string>();
            const availableColumns = [1, 2, 3];

            // Collect the letters that are already in the game
            wordsInGame.forEach(word => {
                availableLetters.add(word.letters[0].letter);
                if (word.column) {
                availableColumns.splice(availableColumns.indexOf(word.column), 1);
                }
            });
            if (availableColumns.length > 0){
                result = state.map(word => {
                    if (!word.isInGame && availableColumns.length > 0) {
                        const firstLetter = word.letters[0].letter;
                        if (!availableLetters.has(firstLetter)) {
                            const newColumn = availableColumns.shift()!;
                            availableLetters.add(firstLetter);
                            return { ...word, isInGame: true, column: newColumn };
                        }
                    }
                    return { ...word};
                    
                });
            } else {
                result = state
            }
            return [...result];
        }

        case REDUCER_ACTION_TYPE.REGISTER_INPUT:{
            function isLetterPayload(payload: WordType | {id: string, letter: string}): payload is { id: string, letter: string } {
                return (payload as { id: string, letter: string }).letter !== undefined;
            }

            if (!action.payload || !isLetterPayload(action.payload)) {
                throw new Error('action.payload missing')
            }

            const {id, letter} = action.payload
            const unchangedWords = state.filter(w => w.id !== id)
            const wordToChange = state.filter(w => w.id === id)[0]
            wordToChange.isInFocus = true
            
            for (let i = 0; i < wordToChange.letters.length; i++){
                if (wordToChange.letters[i].position === 'current'){
                    if (wordToChange.letters[i].letter === letter){
                        wordToChange.letters[i].position = 'past'
                        wordToChange.letters[i].correct = true
                        if (wordToChange.letters[i + 1]){
                            wordToChange.letters[i + 1].position = 'current'
                        }
                    }else{
                        wordToChange.letters[i].correct = false
                    }
                    
                    break
                } 
            }

            
            return [...unchangedWords, wordToChange]
        }
        case REDUCER_ACTION_TYPE.RESET_WORDS:{
            return []
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useWordsContext = (initWordsState: WordsStateType) => {
    const [state, dispatch] = useReducer(reducer, initWordsState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const words = state
    return { dispatch, words, REDUCER_ACTIONS}
}


export type UseWordsContextType = ReturnType<typeof useWordsContext>

const initWordsContextState: UseWordsContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    words: [],
}

const WordsContext = createContext<UseWordsContextType>(initWordsContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const WordsProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <WordsContext.Provider value={useWordsContext(initWordsState)}>
            {children}
        </WordsContext.Provider>
    )
}

export default WordsContext 