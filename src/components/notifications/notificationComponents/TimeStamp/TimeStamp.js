import React from 'react'
import { getTimeDif } from '../../../TimeDifference'

import './TimeStamp.css';

export const TimeStamp = (props) => {
    return (
       <div className="time-stamp">{getTimeDif(props.time)}</div>
    )
}
