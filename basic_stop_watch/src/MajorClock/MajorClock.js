import React from "react";
import { ms2Time } from "../util";

const MajorClock = ({milliseconds=0}) => {
  return <h1>{ms2Time(milliseconds)}</h1>
}

export default MajorClock;