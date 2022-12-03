import Status from "./Status";
import Square from "./Square";
import { useEffect, useState } from "react";
import checkWin from "../Helper/checkWin";
import MoveButton from "./MoveButton";

const GRID = [null,null,null,null,null,null,null,null,null];
const STATUS = {
    FINISHED : "WIN",
    NOTFINISHED : "ONGOING",
    DRAW : "DRAW"
  };

export default function Board() {
    const [player, setPlayer] = useState("X");
    const [gridArray, setGridArray] = useState([GRID]);
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState(STATUS.NOTFINISHED);
    const [message, setMessage] = useState(getMessage(player));
    const [move, setMove] = useState(null);

    useEffect(() => {
        console.log(turn);
        if (checkWin(gridArray[turn])) {
            setGameState(STATUS.FINISHED);
            return;
        }
        if (turn === 9) {
            setGameState(STATUS.DRAW);
            return;
        }
        setGameState(STATUS.NOTFINISHED);
    }, [turn, gridArray]);

    useEffect(() => {
        setMessage(getMessage(player));
    }, [gameState, player]);
    
    function handleClick(index) {
        if (gameState !== STATUS.NOTFINISHED) {
            return;
        } else {
            console.log(gridArray);
            handleGrid(index);
            handleMoveButton();
            togglePlayer();
            setTurn(turn + 1);
        }
    }

    function handleGrid(index) {
        const gridCopy = gridArray[turn].map(x => x);
        gridCopy[index] = player;
        gridArray.push(gridCopy);
        setGridArray(gridArray);
    }

    function handleMoveButton() {
        setMove(gridArray.map((step, move) => {
            return <MoveButton turn = {move}/>
        }));
    }

    function togglePlayer() {
        if (player === "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    }

    function getMessage(player) {            
        const TURN_MESSAGE = `It's player ${player} turn!`;
        const WIN_MESSAGE = `Player ${player} won!`;
        const DRAW_MESSAGE = `It's a draw`;
        if (gameState === STATUS.FINISHED) {
            return WIN_MESSAGE;
        }
        if (gameState === STATUS.DRAW) {
            return DRAW_MESSAGE;
        }
        return TURN_MESSAGE;
    }

    return(
        <>
            <Status message = {message}/>
            <div className="board-row">
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(0)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(1)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(3)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(4)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(6)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(7)} />
              <Square index = {[gameState,STATUS]} value = {player} onClick = {() => handleClick(8)} />
            </div>
            <ol>{move}</ol>
        </>
    )
}