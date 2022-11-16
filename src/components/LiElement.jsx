import React from 'react'
import { decode } from 'html-entities';

export default function LiElement({ handleClick, answer, isSelect, gameStatus, correctAns}) {
  

  console.log("isCorrect", isSelect)

  let colorVar = isSelect == "Held" && !gameStatus ? "falseAns"
                : isSelect == "Held" ? "selected"
                : ""

  let correctColor = !gameStatus && correctAns == answer && "correct"

  return (
    <div className={`${!gameStatus && "notallowed"}`}>
    <li className={`answers ${!gameStatus && "opacity-50"} ${colorVar} ${correctColor} ${!gameStatus && "disabled"} `}  onClick={handleClick}>{decode(answer)}</li>
    </div>
  )
}
