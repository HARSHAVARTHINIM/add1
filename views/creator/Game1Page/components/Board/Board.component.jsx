import React from "react";
import Cell from "../Cell/Cell.component";
import "./Board.scss";
import { Button } from "reactstrap";
import { getPlayer, getSnakes, getLadder } from "../../utils/util";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Assuming images are moved to the public directory
const player1Image = "https://atlas-content-cdn.pixelsquid.com/stock-images/blue-chess-piece-pawn-chessmen-047Onk3-600.jpg";
const player2Image = "https://atlas-content-cdn.pixelsquid.com/stock-images/green-chess-piece-pawn-chessmen-Od7qM2B-600.jpg";

export default function Board() {
  const [diceNumbers, setDiceNumbers] = React.useState([1, 1]);
  const [players, setPlayers] = React.useState(getPlayer());
  const [snakes] = React.useState(getSnakes());
  const [ladders] = React.useState(getLadder());
  const [turn, setTurn] = React.useState(0);
  const [gameover, setGameover] = React.useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const onRollDiceClick = React.useCallback(() => {
    if (gameover) return; // Prevent action if the game is over

    const min = 1;
    const max = 7;
    const rand = Math.floor(min + Math.random() * (max - min));
    let player = [...players];
    const currentTurn = turn;

    let newDiceNumbers = [...diceNumbers];
    newDiceNumbers[currentTurn] = rand;
    setDiceNumbers(newDiceNumbers);

    if (!player[currentTurn].start) {
      if (rand === 1) player[currentTurn].start = true;
      setPlayers(player);
      setTurn(currentTurn === 0 ? 1 : 0);
      return;
    } else if (player[currentTurn].status > 144) { // Changed from 94 to 144
      const sum = player[currentTurn].status + rand;
      if (sum > 150) { // Changed from 100 to 150
        setPlayers(player);
        setTurn(currentTurn === 0 ? 1 : 0);
        return;
      } else if (sum === 150) { // Changed from 100 to 150
        player[currentTurn].status = sum;
        setPlayers(player);
        setTurn(currentTurn === 0 ? 1 : 0);
        setGameover(true);
        toast.success("Game Over " + player[currentTurn].name + " Won", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }
    }

    player[currentTurn].status += rand;
    let status = player[currentTurn].status;
    
    // Snake bite
    const snakeFound = checkSnake(status);
    if (snakeFound) player[currentTurn].status = snakeFound.tail;

    // Ladder Check
    const ladderFound = checkLadder(status);
    if (ladderFound) player[currentTurn].status = ladderFound.to;

    setPlayers(player);
    setTurn(currentTurn === 0 ? 1 : 0);
  }, [players, turn, gameover, diceNumbers]);

  const checkSnake = (i) => {
    return snakes.find((k) => k.head === i);
  };

  const checkLadder = (i) => {
    return ladders.find((k) => k.from === i);
  };

  const checkPlayer = (i) => {
    return players.find((k) => k.status === i);
  };

  const createBoard = (init, cellnos) => {
    const boardHtml = [];

    for (let i = init; i <= cellnos; i++) {
      const playerFound = checkPlayer(i);
      const snakeFound = checkSnake(i);
      const ladderFound = checkLadder(i);
      const found = { backgroundColor: "grey" };

      boardHtml.push(
        <Cell
          sStyle={found}
          snake={snakeFound}
          ladder={ladderFound}
          player={playerFound}
          number={i}
          key={i}
        />
      );
    }
    return boardHtml;
  };

  const startVoiceRecognition = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  React.useEffect(() => {
    // Filter the transcript to detect "roll" more precisely
    const isRollCommand = /roll/i.test(transcript);

    if (isRollCommand && !gameover) {
      onRollDiceClick(); // Trigger dice roll only if the game is not over
      resetTranscript(); // Clear the transcript after processing the command
    }
  }, [transcript, onRollDiceClick, gameover, resetTranscript]);

  const fixedCol = 10; // Number of columns per row
  const rows = 15; // Number of rows, updated to 15 to accommodate additional cells
  const boardHtml = [];
  for (let i = 0; i < rows; i++) {
    const eachRow = createBoard(i * fixedCol + 1, fixedCol * (i + 1));
    boardHtml.push(<div key={i * fixedCol + 1 + "main"}>{eachRow}</div>);
  }

  return (
    <>
      <div className="boardGame">
        <div className={`player-column ${turn === 0 ? 'active-player' : ''}`}>
          <div className="dice">
            <span style={{ padding: "1rem" }}>
              {players[turn].start ? "Turn for" : "Wait for"} {players[turn].name}
            </span>
            <span style={{ padding: "1rem" }}>
              {!players[turn].start ? "" : ""}
            </span>
            <Button className="start-button" onClick={() => players[turn].start = true}>
              Get '1' to Start
            </Button>
          </div>
          <div>
            <Button className="roll-dice-button" onClick={onRollDiceClick}>
              Roll the dice
            </Button>
            <span style={{ padding: "1rem" }}>
              {players[0].name + " rolled: " + diceNumbers[0]}
            </span>
            <Button className="voice-button" onClick={startVoiceRecognition}>
              Start Voice Recognition
            </Button>
            <Button className="voice-button" onClick={stopVoiceRecognition}>
              Stop Voice Recognition
            </Button>
          </div>
          <div>
            <img src={player1Image} alt="Player 1" className="player-image" />
          </div>
          <div className="player-heading">
            <h2>Player 1</h2>
          </div>
        </div>

        <div className="table-container">
          <div className="table">{boardHtml}</div>
        </div>

        <div className={`player-column ${turn === 1 ? 'active-player' : ''}`}>
          <div className="dice">
            <span style={{ padding: "1rem" }}>
              {players[turn === 0 ? 1 : 0].start ? "Turn for" : "Wait for"} {players[turn === 0 ? 1 : 0].name}
            </span>
            <span style={{ padding: "1rem" }}>
              {!players[turn === 0 ? 1 : 0].start ? "" : ""}
            </span>
            <Button className="start-button" onClick={() => players[turn === 0 ? 1 : 0].start = true}>
              Get '1' to Start
            </Button>
          </div>
          <div>
            <Button className="roll-dice-button" onClick={onRollDiceClick}>
              Roll the dice
            </Button>
            <span style={{ padding: "1rem" }}>
              {players[1].name + " rolled: " + diceNumbers[1]}
            </span>
            <Button className="voice-button" onClick={startVoiceRecognition}>
              Start Voice Recognition
            </Button>
            <Button className="voice-button" onClick={stopVoiceRecognition}>
              Stop Voice Recognition
            </Button>
          </div>
          <div>
            <img src={player2Image} alt="Player 2" className="player-image" />
          </div>
          <div className="player-heading">
            <h2>Player 2</h2>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
