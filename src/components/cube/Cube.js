import React, { Component } from "react";
import './Cube.css';

class Cube extends Component {
    faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    constructor(props) {
        super(props);
        this.state = { cubeFaceClass: '' };
    }

    componentDidMount() {
        this.setState({ cubeFaceClass: 'show-' + this.faces[0] });
    }

    changeDice = () => {
        let randomInt = this.getRandomInt(1,6);
        this.setState({ cubeFaceClass: 'rotate-cube' });
        setTimeout(() => this.setState({ cubeFaceClass: 'show-' + this.faces[randomInt - 1] }),800);
        this.props.onClick(randomInt);
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        let { cubeFaceClass } = this.state;
        return (
            <div className="scene">
                <div className={"cube " + cubeFaceClass} onClick={this.changeDice}>
                    <div className="cube__face cube__face--front">1</div>
                    <div className="cube__face cube__face--back">2</div>
                    <div className="cube__face cube__face--right">3</div>
                    <div className="cube__face cube__face--left">4</div>
                    <div className="cube__face cube__face--top">5</div>
                    <div className="cube__face cube__face--bottom">6</div>
                </div>
            </div>
        );
    }
}

export default Cube;