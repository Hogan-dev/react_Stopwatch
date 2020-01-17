import React from "react";
import { Fragment } from "react";
import MajorClock from "./MajorClock/MajorClock";
import ControlButtons from "./ControlButtons/ControlButtons";
import SplitTimes from "./SplitTimes/SplitTimes";

class StopWatch extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isStarted: false,
      startTime: null,
      currentTime: null,
      splits: []
    }
  }

  onStart = () => {
    this.setState({
      isStarted: true,
      startTime: new Date(),
      currentTime: new Date()
    });

    this.intervalHandle = setInterval(() => {
      this.setState({currentTime: new Date()});
    }, 1000 / 60);
  }

  onPause = () => {
    clearInterval(this.intervalHandle);
    this.setState({
      isStarted: false
    })
  }

  onReset = () => {
    this.setState({
      startTime: null,
      currentTime: null,
      splits: []
    })
  }

  onSplit = () => {
    this.setState({
      splits: [...this.state.splits, this.state.currentTime - this.state.startTime]
    })
  }

  render() {
    return (
      <Fragment>
        <MajorClock milliseconds={this.state.currentTime - this.state.startTime}/>
        <ControlButtons 
          activated={this.state.isStarted}
          onStart={this.onStart}
          onPause={this.onPause}
          onReset={this.onReset}
          onSplit={this.onSplit}
        />
        <SplitTimes value={this.state.splits}/>
      </Fragment>
    )
  }
}

export default StopWatch;