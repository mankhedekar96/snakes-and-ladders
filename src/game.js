import React, { useState } from 'react';
import { Ladders, Snakes } from './config';
import usePosition from './position';


const useGame = (initialState) => {
    const position = usePosition(initialState);

    const [currentStateOfGame, setCurrentState] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState('');

    const [{ currentPosition, currentLeft }, { setCurrentPosition,
        setCurrentBottom,
        setCurrentLeft,
        setMoveDirection,
        goToPosition }] = position;

    const startGame = React.useCallback(() => {
        setCurrentState(true);
        setCurrentLeft(currentLeft - 10);
    }, [currentLeft, setCurrentLeft]);

    const resetGame = React.useCallback(() => {
        setCurrentState(false);
        setCurrentPosition(0);
        setCurrentBottom(0);
        setCurrentLeft(0);
        setMoveDirection('right');
        setConsoleOutput('');
    }, [setCurrentBottom, setCurrentLeft, setCurrentPosition, setMoveDirection]);

    // Checking for snakes
    const checkForSnakes = React.useCallback((pos) => {
        Snakes.forEach(snake => {
            if (snake.head === pos) {
                goToPosition(snake.tail);
            }
        });
    }, [goToPosition]);

    // Cheking for ladders
    const checkForLadders = React.useCallback((pos) => {
        Ladders.forEach(ladder => {
            if (ladder.foot === pos) {
                goToPosition(ladder.top);
            }
        });
    }, [goToPosition]);

    // When dice is tossed
    const onDiceTossed = React.useCallback((diceNumber) => {
        let pos = currentPosition + diceNumber;
        if (pos <= 100) {
            goToPosition(pos);

            // After final movement
            checkForSnakes(pos);
            checkForLadders(pos);
        }
    }, [currentPosition, goToPosition, checkForLadders, checkForSnakes]);

    // On form submit
    const onFormSubmit = React.useCallback((position, diceOutcome) => {
        let newPosition = position + diceOutcome;
        if (newPosition <= 100) {
            goToPosition(newPosition);
            // onDiceTossed(diceOutcome);

            Snakes.forEach(snake => {
                if (snake.head === newPosition) {
                    goToPosition(snake.tail);
                    newPosition = snake.tail;
                }
            });

            Ladders.forEach(ladder => {
                if (ladder.foot === newPosition) {
                    goToPosition(ladder.top);
                    newPosition = ladder.top;
                }
            });

            console.log('Current position: ', position);
            console.log('Dice Outcome: ', diceOutcome);

            setConsoleOutput(`Current position: ${position} \n Dice Outcome: ${diceOutcome} \n New position: ${newPosition}`);
        } else {
            goToPosition(position);

            console.log('Current position: ', position);
            console.log('Dice Outcome: ', diceOutcome);

            setConsoleOutput(`Current position: ${position} \n Dice Outcome: ${diceOutcome} \n Same position: ${position}`);
        }
    }, [goToPosition]);

    return [{
        position,
        currentStateOfGame,
        consoleOutput
    },
    {
        resetGame,
        startGame,
        onDiceTossed,
        onFormSubmit,
        checkForSnakes,
        checkForLadders
    }]
}

export default useGame;