import React, { useState } from 'react';
import styled from 'styled-components';

const Game4Page = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = board.slice();
        if (calculateWinner(board) || board[index]) return;
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => (
        <Square onClick={() => handleClick(index)}>
            {board[index]}
        </Square>
    );

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

    return (
        <PageWrapper>
            <Title>{status}</Title>
            <Board>
                {Array(9).fill(null).map((_, index) => (
                    <React.Fragment key={index}>
                        {renderSquare(index)}
                    </React.Fragment>
                ))}
            </Board>
        </PageWrapper>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Game4Page;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: var(--clr-violet-dark-active);
    color: #fff;
    min-height: 100vh;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 2em;
    color: #e3e3e3;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 5px;
    margin-top: 20px;
`;

const Square = styled.button`
    width: 100px;
    height: 100px;
    background-color: #333;
    color: #fff;
    font-size: 2em;
    font-weight: bold;
    border: 2px solid #444;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #555;
    }

    &:focus {
        outline: none;
    }
`;

