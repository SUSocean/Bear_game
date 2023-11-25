import { useContext } from "react"

import WordsContext from "../context/wordsContext"
import Word from "./Word";

const WordsList = () => {
    const {words} = useContext(WordsContext)
    
    const activeWords = words.filter(word => word.isInGame === true)
    .map(aWord => <Word {...aWord} key={aWord.id}/>)

    return (
        <>
        <div className="words_list">
            {activeWords}
        </div>
        </>
    )   
}

export default WordsList