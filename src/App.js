import React, { Component } from 'react';
import playboard from './assets/snakes-ladders-board.png';
import locationIcon from './assets/location.svg';
import './App.css';
import Form from './components/form/Form';
import { Ladders, Snakes } from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { startGame: false, currentPosition: 0, currentBottom: 0, currentLeft: 0, move: 'right', output: '' };
  }

  // Start the game
  startGame = () => {
    this.setState(prevState => ({ startGame: true, currentPosition: 0, currentLeft: prevState.currentLeft - 10 }));
  }

  // When dice is tossed
  onDiceTossed = (diceNumber) => {
    let { currentPosition } = this.state;

    if (currentPosition + diceNumber <= 100) {
      let i = 1;
      while (i <= diceNumber) {
        setTimeout(() => {
          this.setState(prevState => ({ currentPosition: prevState.currentPosition + 1 }));
          this.moveLocationIcon();

        }, 500 * i);
        i++;
      }

      // After final movement
      setTimeout(() => {
        this.checkForSnakes();
        this.checkForLadders();

        console.log('New position:', this.state.currentPosition);

        this.setState(prevState => ({ output: `${prevState.output} \n New position: ${this.state.currentPosition}` }));
      }, (500 * diceNumber) + 500);
    }
  }

  // Move location-icon to currentPosition
  moveLocationIcon = () => {
    let { currentPosition } = this.state;
    if (currentPosition <= 100) {
      switch (currentPosition) {
        case 21:
        case 41:
        case 61:
        case 81:
          this.setState({ move: 'right' });
          this.moveVertical();
          break;
        case 11:
        case 31:
        case 51:
        case 71:
        case 91:
          this.setState({ move: 'left' });
          this.moveVertical();
          break;
        default:
          this.moveHorizontal();
      }
    }
  }

  // Move location-icon horizontally
  moveHorizontal = () => {
    let { move } = this.state;
    if (move === 'right') {
      this.setState((prevState) => ({ currentLeft: prevState.currentLeft + 10 }));
    } else {
      this.setState((prevState) => ({ currentLeft: prevState.currentLeft - 10 }));
    }
  }

  // Move location-icon vertically
  moveVertical = () => {
    this.setState(prevState => ({ currentBottom: prevState.currentBottom + 10 }));
  }

  // Checking for snakes
  checkForSnakes = () => {
    let { currentPosition } = this.state;
    Snakes.forEach(snake => {
      if (snake.head === currentPosition) {
        this.goToPosition(snake.tail);
      }
    });
  }

  // Cheking for ladders
  checkForLadders = () => {
    let { currentPosition } = this.state;
    Ladders.forEach(ladder => {
      if (ladder.foot === currentPosition) {
        this.goToPosition(ladder.top);
      }
    });
  }

  // Go to position
  goToPosition = (position) => {
    let bottom = parseInt(position / 10),
      left = position % 10;

    bottom -= left === 0 ? 1 : 0;

    if ([0, 2, 4, 6, 8].includes(bottom)) {
      this.setState({ currentPosition: position, currentBottom: bottom * 10, move: 'right', currentLeft: (left === 0 ? 9 : (left - 1)) * 10 });

    } else {
      this.setState({ currentPosition: position, currentBottom: bottom * 10, move: 'left', currentLeft: (left === 0 ? 0 : (10 - left)) * 10 });
    }
  }

  // On form submit
  onFormSubmit = async (position, diceOutcome) => {
    if (position + diceOutcome <= 100) {
      await this.goToPosition(position);
      this.onDiceTossed(diceOutcome);

      console.log('Current position: ', position);
      console.log('Dice Outcome: ', diceOutcome);

      this.setState({ output: `Current position: ${position} \n Dice Outcome: ${diceOutcome}` });
    } else {
      await this.goToPosition(position);

      console.log('Current position: ', position);
      console.log('Dice Outcome: ', diceOutcome);

      this.setState({ output: `Current position: ${position} \n Dice Outcome: ${diceOutcome} \n New position: ${position}` });
    }
  }

  // Reset app
  resetApp = () => {
    this.setState({ startGame: false, currentPosition: 0, currentBottom: 0, currentLeft: 0, move: 'right', output: '' });
  }

  render() {
    const { startGame, currentBottom, currentLeft, output } = this.state;
    return (
      <div className="container">
        <header className="header">
          <p>Snakes and Ladders</p>
        </header>

        <div className="play-board">
          <img src={playboard} className="play-board-img" alt="play-board" />
          {startGame && <img src={locationIcon} className="play-location-img" style={{ bottom: 3 + currentBottom + '%', left: 4 + currentLeft + '%' }} alt="location" />}

          <div className="initial-box-container">
            <div className="initial-box">
              00
            </div>
          </div>
        </div>

        <div className="input-board">
          {!startGame &&
            <div className="start-btn" onClick={this.startGame}>
              <p>START <img src={locationIcon} className="location-img" alt="location" /> </p>
            </div>
          }
          {startGame && <Form
            onFormSubmit={this.onFormSubmit}
            onDiceTossed={this.onDiceTossed}
            resetApp={this.resetApp} />}
        </div>

        <div className="output-board">
          <p>{output}</p>
        </div>
      </div>
    );
  }
}

export default App;
