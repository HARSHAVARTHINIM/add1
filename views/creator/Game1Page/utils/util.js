export function getSnakes() {
  const snakes = [
    {
      head: 42,
      tail: 18,
      imgClass: "snake4",
      divClass:"imageContainerSnake4",
    },
    {
      head: 42,
      tail: 57,
      imgClass: "snake",
      divClass:"imageContainerSnake",
    },
    {
      head: 77,
      tail: 57,
      imgClass: "snake2",
      divClass:"imageContainerSnake2",
    },
    {
      head: 50,
      tail: 33,
      imgClass: "snake3",
      divClass:"imageContainerSnake3",
    },
    {
      head: 96,
      tail: 52,
      imgClass: "snake5",
      divClass:"imageContainerSnake5",
    },
    {
      head: 74,
      tail: 10,
      imgClass: "snake6",
      divClass:"imageContainerSnake6",
    },
    {
      head: 78,
      tail: 52,
      imgClass: "snake7",
      divClass:"imageContainerSnake7",
    },
    {
      head: 69,
      tail: 52,
      imgClass: "snake8",
      divClass:"imageContainerSnake8",
    },
    {
      head: 79,
      tail: 52,
      imgClass: "snake9",
      divClass:"imageContainerSnake9",
    },
    {
      head: 80,
      tail: 52,
      imgClass: "snake10",
      divClass:"imageContainerSnake10",
    },
  ];
  return snakes;
}
export function getLadder() {
  const ladders = [
    {
      from: 6,
      to: 34,
      imgClass: "ladder1",
      divClass:"imageContainerLadder1",
    },
    {
      from: 66,
      to: 94,
      imgClass: "ladder2",
      divClass:"imageContainerLadder2",
    },
    {
      from: 56,
      to: 84,
      imgClass: "ladder3",
      divClass:"imageContainerLadder3",
    },
    {
      from: 71,
      to: 84,
      imgClass: "ladder4",
      divClass:"imageContainerLadder4",
    },
    {
      from: 64,
      to: 86,
      imgClass: "ladder5",
      divClass:"imageContainerLadder5",
    },
    {
      from: 69,
      to: 88,
      imgClass: "ladder6",
      divClass:"imageContainerLadder6",
    },
    {
      from: 63,
      to: 80,
      imgClass: "ladder7",
      divClass:"imageContainerLadder7",
    },
  ];
  return ladders;
}
export function getPlayer() {
  const players = [
    {
      name: "Player1",
      id: 1,
      status: 1,
      imgClass: "P1",
      divClass:"imageContainerP1",
      style: {
        "backgroundColor": "yellow",
      },
      start : false,
    },
    {
      name: "Player2",
      id: 2,
      status: 1,
      imgClass: "P2",
      divClass:"imageContainerP2",
      style: {
        "backgroundColor": "green",
      },
      start: false,
    },
  ];
  return players;
}
