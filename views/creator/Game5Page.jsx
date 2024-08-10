import React, { useEffect, useState, useRef } from 'react';
import carImg from '../../assets/images/car.png';
import car2Img from '../../assets/images/car2.jpg';

const Game2Page = () => {
  const [player, setPlayer] = useState({ speed: 5, score: 0, start: false, x: 0, y: 0 });
  const [keys, setKeys] = useState({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });
  const gameAreaRef = useRef(null);
  const scoreRef = useRef(null);
  const startScreenRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const keyDown = (e) => {
      e.preventDefault();
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    };

    const keyUp = (e) => {
      e.preventDefault();
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    };

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  }, []);

  useEffect(() => {
    if (player.start) {
      window.requestAnimationFrame(gamePlay);
    }
  }, [player.start, keys]);

  const isCollide = (a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
  };

  const moveLines = () => {
    const lines = document.querySelectorAll('.lines');
    lines.forEach((item) => {
      // Move lines down
      if (item.y >= window.innerHeight) {
        item.y = -100;  // Reset to the top
      }
      item.y += player.speed;  // Move lines based on player speed
      item.style.top = item.y + 'px';
    });
  };

  const endGame = () => {
    setPlayer((prevPlayer) => ({ ...prevPlayer, start: false }));
    startScreenRef.current.classList.remove('hide');
    startScreenRef.current.innerHTML = `Game Over <br> Final score: ${player.score} <br>Press again to restart`;
  };

  const moveEnemy = (car) => {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((item) => {
      if (isCollide(car, item)) {
        console.log('Bang!');
        endGame();
      }
      if (item.y >= window.innerHeight) {
        item.y = -100;  // Reset to the top
        item.style.left = Math.floor(Math.random() * (gameAreaRef.current.clientWidth - 50)) + 'px';  // Random horizontal position
      }
      item.y += player.speed;  // Move enemy cars based on player speed
      item.style.top = item.y + 'px';
    });
  };

  const gamePlay = () => {
    const car = carRef.current;
    const road = gameAreaRef.current.getBoundingClientRect();

    if (player.start) {
      moveLines();
      moveEnemy(car);

      let updatedPlayer = { ...player };
      if (keys.ArrowUp && updatedPlayer.y > road.top + 70) {
        updatedPlayer.y -= updatedPlayer.speed;
      }
      if (keys.ArrowDown && updatedPlayer.y < road.bottom - 120) {
        updatedPlayer.y += updatedPlayer.speed;
      }
      if (keys.ArrowLeft && updatedPlayer.x > 0) {
        updatedPlayer.x -= updatedPlayer.speed;
      }
      if (keys.ArrowRight && updatedPlayer.x < road.width - 50) {
        updatedPlayer.x += updatedPlayer.speed;
      }

      car.style.top = updatedPlayer.y + 'px';
      car.style.left = updatedPlayer.x + 'px';

      setPlayer(updatedPlayer);
      window.requestAnimationFrame(gamePlay);

      const score = updatedPlayer.score + 1;
      setPlayer((prevPlayer) => ({ ...prevPlayer, score }));
      scoreRef.current.innerText = `Score: ${score - 1}`;
    }
  };

  const startGame = () => {
    startScreenRef.current.classList.add('hide');
    gameAreaRef.current.innerHTML = '';
    setPlayer((prevPlayer) => ({ ...prevPlayer, start: true, score: 0 }));

    // Create road lines
    for (let x = 0; x < 5; x++) {
      const roadLine = document.createElement('div');
      roadLine.setAttribute('class', 'lines');
      roadLine.y = x * 150;
      roadLine.style.top = roadLine.y + 'px';
      gameAreaRef.current.appendChild(roadLine);
    }

    // Create player car
    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    car.style.backgroundImage = `url(${car2Img})`;
    carRef.current = car;
    gameAreaRef.current.appendChild(car);

    setPlayer((prevPlayer) => ({ ...prevPlayer, x: car.offsetLeft, y: car.offsetTop }));

    // Create enemy cars
    for (let x = 0; x < 3; x++) {
      const enemyCar = document.createElement('div');
      enemyCar.setAttribute('class', 'enemy');
      enemyCar.y = (x + 1) * -200;  // Start enemies off-screen
      enemyCar.style.top = enemyCar.y + 'px';
      enemyCar.style.backgroundColor = randomColor();
      enemyCar.style.left = Math.floor(Math.random() * (gameAreaRef.current.clientWidth - 50)) + 'px';  // Random horizontal position
      gameAreaRef.current.appendChild(enemyCar);
    }
  };

  const randomColor = () => {
    const c = () => {
      const hex = Math.floor(Math.random() * 256).toString(16);
      return ('0' + String(hex)).substr(-2);
    };
    return '#' + c() + c() + c();
  };

  return (
    <div className="carGame">
      <style>{`
        * {
          margin: 0;
          padding: 0;
        }
        .hide {
          display: none;
        }
        .car {
          height: 120px;
          border-radius: 10px;
          width: 50px;
          position: absolute;
          bottom: 120px;
          background: url(${car2Img});
          background-repeat: no-repeat;
          background-size: 50px 120px;
        }
        .carGame {
          width: 100%;
          height: 100vw;
          background: #006400;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .lines {
          width: 10px;
          height: 100px;
          background: white;
          position: absolute;
          margin-left: 190px;
        }
        .gameArea {
          height: 100vh;
          width: 400px;
          background: #2c3456;
          margin: auto;
          position: relative;
          overflow: hidden;
          border-right: 7px dashed #c8d6e5;
          border-left: 7px dashed #c8d6e5;
        }
        .enemy {
          height: 100px;
          border-radius: 10px;
          width: 50px;
          position: absolute;
          bottom: 120px;
          background: url(${carImg});
          background-repeat: no-repeat;
          background-size: 50px 100px;
        }
        .score {
          position: absolute;
          top: 15px;
          left: 40px;
          background: #10ac84;
          width: 120px;
          height: 50px;
          text-align: center;
          font-size: 1.5em;
          color: white;
          font-family: fantasy;
          box-shadow: 0 5px 5px #777;
        }
        .startScreen {
          position: absolute;
          top: 50%;
          left: 50%;
          background: #00ced1;
          transform: translate(-50%, -50%);
          color: white;
          z-index: 1;
          text-align: center;
          border: 1px solid #ff6b6b;
          padding: 15px;
          margin: auto;
          width: 50%;
          cursor: pointer;
          font-family: carfont;
          letter-spacing: 5;
          font-size: 20px;
          word-spacing: 3;
          line-height: 30px;
          text-transform: uppercase;
          box-shadow: 0 5px 5px #777;
        }
      `}</style>
      <div className="score" ref={scoreRef}></div>
      <div className="startScreen" ref={startScreenRef} onClick={startGame}>
        <h1>CAR RACING GAME</h1>
        <p>Press here to start<br />If you hit you lose...</p>
      </div>
      <div className="gameArea" ref={gameAreaRef}></div>
    </div>
  );
};

export default Game2Page;
