import React from 'react'

export default function Welcome({setStartGame}) {
    return (<>
        <div className="heading--container">
            <h1 className="title-welcome">
                {"Just A Quiz Game"}
            </h1>
            <p className="quiz-description">
                {"I don't know where to start discover it urself"}
            </p>
            <button onClick={() => setStartGame(prevState => !prevState)}>
                Start Quiz
            </button>
        </div>

        <div className="path-container-top">
            <div className="path-top path-size path-top-position"></div>
        </div>

        <div className="path-container-bottom">
            <div className="path-bottom path-size path-bottom-position"></div>
        </div>
    </>
    )
}
