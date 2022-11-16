import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'

export default function Trivia({ triviaData, setRestart }) {

    let [gameStatus, setGameStatus] = useState(true)
    let [answersArray, setAnswersArray] = useState(() => [])
    let [counter, setCounter] = useState(1)
    let [randomize, setRandomize] = useState(false)
    let [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    console.log("answersArray => ",answersArray)

    let [selectionObject,setSelectionObject] = useState([
        { questionOne: "", isTrue: "pending" },
        { questionTwo: "", isTrue: "pending" },
        { questionThree: "", isTrue: "pending" },
        { questionFour: "", isTrue: "pending" },
        { questionFive: "", isTrue: "pending" }
    ])


    function updateSelectionObject(index, ans) {
        let question = Object.keys(selectionObject[index])
        let newselectionObject = [...selectionObject]
        let questionToUpdate = newselectionObject[index]
        questionToUpdate[question[0]] = ans
        selectionObject = newselectionObject
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function validateAnswers() {
        let newSelectionObject = [...selectionObject]

        for (let i = 0; i < newSelectionObject.length; i++) {
            if (answersArray[i]["correct_answer"] == newSelectionObject[i][Object.keys(newSelectionObject[i])[0]]) {
                console.log(answersArray[i])
                newSelectionObject[i]["isTrue"] = true
                continue
            }
            selectionObject[i]["isTrue"] = false
        }

        setSelectionObject(newSelectionObject)
    }
    
    function handleGameStatus() {
        if (counter == 1) {
            setGameStatus(false)
            validateAnswers()
            setCounter(2)
        } else {
            setRandomize(prevState => !prevState)
            setCounter(1)
            setRestart()
            setGameStatus(true)
        }
        setCorrectAnswerCount(selectionObject.filter(value => value["isTrue"] == true).length)
    }



    useEffect(() => {
        let newAnswersArray = triviaData.map(obj => {

            let incorrectAnswers = [...obj.incorrect_answers]
            incorrectAnswers.push(obj.correct_answer)

            let ObjAnswers = incorrectAnswers.map(value => ({ answer: value, isHeld: false }))
            let radomizedArr = shuffleArray(ObjAnswers)

            return { ...obj, incorrect_answers: radomizedArr }
        })

        return setAnswersArray(newAnswersArray)

    }, [randomize])

    let renderQuestions = answersArray.map((obj, index) => <Question
        key={nanoid()}
        qindex={index}
        setAnswersArray={setAnswersArray}
        updateSelectionObject={updateSelectionObject}
        resultsObject={obj}
        gameStatus={gameStatus}
    />)

    return (<>
        <div className="trivia--container">
            <div className="move-forward">
                <div className="all-questions-container">
                    {renderQuestions}
                </div>
                <div className="score--section">
                    <p className="score" style={{display: !gameStatus ? "block" : "none"}}>
                       {`You scored ${correctAnswerCount}/5 correct answers`}
                    </p>
                    <button onClick={(handleGameStatus)}>
                        {gameStatus ? "Check answers" : "Play Again"}
                    </button>
                </div>
            </div>
        </div>
        <div className="path-container-top">
            <div className="path-top path-size path--trivia-top-position"></div>
        </div>

        <div className="path-container-bottom">
            <div className="path-bottom path-size path--trivia-bottom-position"></div>
        </div>
    </>
    )
}
