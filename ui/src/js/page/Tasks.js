import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';

import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'

export default class Tasks extends Component {
  
  render() {
    const tasks = this.props.store.tasks.map((task) => {
      return <Task 
        id={task.id} 
        name={task.name} 
        date={task.date} 
        state={task.state} 
        store={this.props.store}
        key={task.id}  
        />
    })

    return(
        <div className="tasklist">
          {tasks}
          <TaskAdd />
        </div>
    )
  }
}
