import { useState, useEffect } from 'react'
import Trivia from './components/Trivia'
import Welcome from './components/Welcome'
import "./styles/index.css"

function App() {
  const [startGame, setStartGame] = useState(false)
  const [triviaData, setTriviaData] = useState([])
  const [restart, setRestart] = useState(false)

  useEffect(() => {
    fetchTrivia()
  } ,[restart])

 
  async function fetchTrivia(){
      let response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      let data = await response.json()
      setTriviaData(data.results)
  }

  function restartTheGame () {
    setRestart(!restart)
  }

  return (
    <div className="main--container">
      {startGame ? <Trivia triviaData={triviaData} setRestart={restartTheGame}/> : <Welcome setStartGame={setStartGame} /> }
    </div>
  )
}

export default App
