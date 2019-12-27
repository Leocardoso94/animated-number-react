import React, { Component } from 'react';
import AnimatedNumber from '../lib';

export default class App extends Component {
  state = {
    value: 150,
    duration: 5000,
  };
  handleChangeValue = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleChangeDuration = ({ target: { value } }) => {
    this.setState({ duration: value });
  };
  formatValue = value => `$ ${Number(value).toFixed(2)}`;
  render() {
    return (
      <div>
        <div>
          <label htmlFor="inputValue">
            Value:
            <input
              type="number"
              id="inputValue"
              onChange={this.handleChangeValue}
              value={this.state.value}
            />
          </label>
        </div>
        <div>
          <label htmlFor="inputDuration">
            Duration of animation:
            <input
              type="number"
              id="inputDuration"
              onChange={this.handleChangeDuration}
              value={this.state.duration}
            />
          </label>
        </div>
        <br />
        <AnimatedNumber
          value={this.state.value}
          formatValue={this.formatValue}
          duration={this.state.duration}
          startFrom={5000}
        />
        <hr />
        <button
          onClick={() => {
            this.setState({ value: this.state.value + 500 });
          }}
        >
          Increase 500
        </button>
        <button
          onClick={() => {
            this.setState({ value: this.state.value - 500 });
          }}
        >
          Decrease 500
        </button>
        <br />
      </div>
    );
  }
}
