import React, { Component } from 'react';
import AnimatedNumber from '../lib';

export default class App extends Component {
  state = {
    value: 150,
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  formatValue = value => value.toFixed(2);
  render() {
    return (
      <div>
        <input type="number" onChange={this.handleChange} value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} formatValue={this.formatValue} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
        <br />
        <AnimatedNumber value={this.state.value} />
      </div>
    );
  }
}
