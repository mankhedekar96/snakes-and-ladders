import React, { useState } from 'react';

function usePosition(initialState) {
  const [currentPosition, setCurrentPosition] = useState(initialState.currentPosition);
  const [currentBottom, setCurrentBottom] = useState(initialState.currentBottom);
  const [currentLeft, setCurrentLeft] = useState(initialState.currentLeft);
  const [moveDirection, setMoveDirection] = useState(initialState.moveDirection);

  // Move location-icon horizontally
  const moveHorizontal = React.useCallback(() => {
    if (moveDirection === 'right') {
      setCurrentLeft(currentLeft + 10);
    } else {
      setCurrentLeft(currentLeft - 10);
    }
  }, [currentLeft, moveDirection]);

  // Move location-icon vertically
  const moveVertical = React.useCallback(() => {
    setCurrentBottom(currentBottom + 10);
  }, [currentBottom]);

  // Move location-icon to currentPosition
  const moveLocationIcon = React.useCallback(() => {
    console.log("The variable is ->: moveLocationIcon -> currentPosition", currentPosition)

    if (currentPosition <= 100) {
      switch (currentPosition) {
        case 21:
        case 41:
        case 61:
        case 81:
          setMoveDirection('right');
          moveVertical();
          break;
        case 11:
        case 31:
        case 51:
        case 71:
        case 91:
          setMoveDirection('left');
          moveVertical();
          break;
        default:
          moveHorizontal();
      }
    }
  }, [currentPosition, moveVertical, moveHorizontal]);

  // Go to position
  const goToPosition = React.useCallback((position) => {
    let bottom = parseInt(position / 10),
      left = position % 10;

    bottom -= left === 0 ? 1 : 0;

    setCurrentPosition(position);
    setCurrentBottom(bottom * 10);

    if ([0, 2, 4, 6, 8].includes(bottom)) {
      setMoveDirection('right');
      setCurrentLeft((left === 0 ? 9 : (left - 1)) * 10);
    } else {
      setMoveDirection('left');
      setCurrentLeft((left === 0 ? 0 : (10 - left)) * 10);
    }
  }, []);

  return [{
    currentPosition,
    currentBottom,
    currentLeft,
    moveDirection
  },
  {
    setCurrentPosition,
    setCurrentBottom,
    setCurrentLeft,
    setMoveDirection,
    moveLocationIcon,
    goToPosition
  }];
}

export default usePosition;