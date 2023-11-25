import { WordType } from "../context/wordsContext"
import { v4 as uuidv4 } from 'uuid';
const Word = (word: WordType) =>{
    const renderLetters = word.letters.map(l => {
        const styles = {
            color: l.correct === null? 'white' : l.correct === true? '#8DDCA4' : '#FE5E41',
            fontSize: '2.35rem'
        }
        return (
            <span key={uuidv4()} style={styles}>{l.letter}</span>
        )
    })
    return(
        <div className={`word_wrapper word_wrapper_${word.column}`}>
            <div className={`word ${word.isInFocus? "word_focused" : ""}`}>{renderLetters}</div>
        </div>
    )
}

export default Word