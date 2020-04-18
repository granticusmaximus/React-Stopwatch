import React, { Component } from "react";

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      lapse: 0,
      running: false
    };
  }

  onStart = () => {
    if (this.state.running) {
      this.setState({ running: false });
      clearInterval(this.timer);
    } else {
      this.setState(prevState => ({
        startTime: Date.now() - prevState.lapse,
        running: true
      }));

      this.timer = setInterval(() => {
        this.setState({ lapse: Date.now() - this.state.startTime });
      });
    }
  };

  onClear = () => {
    clearInterval(this.timer);
    this.setState({
      lapse: 0,
      running: false
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    let mins = parseInt(this.state.lapse / 1000) % 60;
    let hours = parseInt(this.state.lapse / 60000);
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 62 }}>
          {this.state.lapse} <br />
          {hours < 10 ? "0" + hours : hours}h:{mins < 10 ? "0" + mins : mins}s
        </p>
        <button onClick={this.onStart}>
          {this.state.running ? (
            "Pause"
          ) : this.state.lapse > 0 ? (
            "Continue"
          ) : (
            "Start"
          )}
        </button>{" "}
        <button onClick={this.onClear}>Clear</button>
      </div>
    );
  }
}

export default Stopwatch;
