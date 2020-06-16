import React, { Component } from "react";
import Cube from './../cube/Cube';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { diceOutcome: '', inputCurrentPosition: '' }
    }

    handlePositionChange = (event) => {
        this.setState({ inputCurrentPosition: event.target.value });
    }

    handleDiceChange = (event) => {
        this.setState({ diceOutcome: event.target.value });
    }

    handleSubmit = () => {
        let inputCurrentPosition = parseInt(this.state.inputCurrentPosition), diceOutcome = parseInt(this.state.diceOutcome);

        if (inputCurrentPosition >= 1 && inputCurrentPosition <= 100) {
            if (diceOutcome >= 1 && diceOutcome <= 6) {
                this.props.onFormSubmit(inputCurrentPosition, diceOutcome);
            } else {
                alert('Please enter valid dice outcome')
            }
        } else {
            alert('Please enter valid Current Position')
        }
    }

    render() {
        let { inputCurrentPosition, diceOutcome } = this.state, { onDiceTossed, resetApp } = this.props;

        return (
            <section className="form">
                <div className="input-area">
                    <div>
                        <label>
                            Current Position:
                    <input type="text" value={inputCurrentPosition} onChange={this.handlePositionChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Dice Outcome:
                    <input type="text" value={diceOutcome} onChange={this.handleDiceChange} />
                        </label>
                    </div>
                    <div>
                        <input className="submit-btn" type="button" value="Submit" onClick={this.handleSubmit} />
                        <input className="reset-btn" type="button" value="Reset" onClick={resetApp} />
                    </div>
                </div>

                <div className="dice-container">
                    <Cube onClick={onDiceTossed} />
                </div>
            </section>
        );
    }
}

export default Form;