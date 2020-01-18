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
      firstTime: null,
      startTime: null,
      currentTime: null,
      isPause: false,
      splits: [],
      diffTime:0
    }
  }

  onStart = () => {
    this.setState({
      isStarted: true,
      isPause: false,
      startTime: new Date(),
      currentTime: new Date()
    });
 
    this.intervalHandle = setInterval(() => {
      this.setState({currentTime: new Date()});
    }, 1000 / 60);
  }

  onPause = () => {
    clearInterval(this.intervalHandle);
    this.diffTime = this.state.currentTime - this.state.startTime;
    this.diffTime = this.diffTime ? this.diffTime : 0
    this.setState({
      isStarted: false,
      startTime: new Date(),
      currentTime: new Date(),
      diffTime: this.state.diffTime + this.diffTime
    })
  }

  onReset = () => {
    this.setState({
      startTime: null,
      currentTime: null,
      splits: [],
      diffTime: 0
    })
  }

  onSplit = () => {
    this.setState({
      splits: [...this.state.splits, this.state.currentTime - this.state.startTime + this.state.diffTime]
    })
  }

  render() {
    console.log(this.state.diffTime);
    return (
      <Fragment>
        <MajorClock milliseconds={this.state.currentTime - this.state.startTime + this.state.diffTime}/>
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