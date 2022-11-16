import React , {useState} from 'react'
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import LiElement from './LiElement';

export default function Question({resultsObject, 
                                qindex, 
                                updateSelectionObject, 
                                setAnswersArray, 
                                gameStatus}) {

    let [inco, setInco] =  useState(resultsObject.incorrect_answers)

    let AnswersLi = inco.map((ans, index) => <LiElement 
                                    key={nanoid()} 
                                    handleClick={() => handleClick(index, ans.answer) } 
                                    answer={ans.answer} 
                                    isSelect={ans.isHeld && "Held"}
                                    gameStatus={gameStatus}
                                    correctAns={resultsObject.correct_answer}
                                    />)

    function handleClick(index, answer){
        updateSelectionObject(qindex, answer)
        let incoCopy = [...inco]
        let newInco = incoCopy.map(ansObject => ({...ansObject, isHeld: false }) )
        newInco[index] = {... newInco[index], isHeld: !inco[index].isHeld}
        setInco(newInco)
        resultsObject.incorrect_answers = newInco
        setAnswersArray(prevAns => {
            let newPrevAns = [...prevAns]
            newPrevAns.splice(qindex, 1, resultsObject)
            return newPrevAns
        })
        
    }
    console.log("Inco => ",inco)
    return (
        <div className='question--container'>
            <h3>{decode(resultsObject.question, { level: 'html5' })}</h3>
            <ul className="answers-container">
                {AnswersLi}
            </ul>
            <div className='delimiter'></div>
        </div>
    )
}
