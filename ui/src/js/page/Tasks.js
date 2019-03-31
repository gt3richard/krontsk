import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';

import Task from './Task.js'
import TaskAdd from './TaskAdd.js'

export default class Tasks extends Component {
  
  render() {
    return(
        <div className="tasklist">
          <Task name="Wells Fargo Credit Card" date="15th" />
          <Task name="Chase Credit Card" date="18th" />
          <Task name="Rent" date="1st" />
          <TaskAdd />
        </div>
    )
  }
}
