import React, { Component } from 'react';
import {observer} from "mobx-react"
import { format } from 'date-fns'
import '../../assets/App.css';
import '../../assets/Tasks.css';

import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'

export default class Tasks extends Component {
  
  render() {

    const today = new Date()

    return(
        <div className="tasklist">
          <h2>{format(today, "do") }</h2>
          <h2 className="task-heading">Not Done</h2>
          {this.props.store.tasks
            .filter(f => f.state !== 'done')
            .sort((a, b) => a.date - b.date)
            .map((task) => 
            <Task 
              id={task.id} 
              name={task.name} 
              date={task.date} 
              state={task.state} 
              store={this.props.store}
              key={task.id}  
              />
            )}
          <TaskAdd store={this.props.store} />
          <h2 className="task-heading">Done</h2>
          {this.props.store.tasks
            .filter(f => f.state === 'done')
            .sort((a, b) => a.date - b.date)
            .map((task) => 
            <Task 
              id={task.id} 
              name={task.name} 
              date={task.date} 
              state={task.state} 
              store={this.props.store}
              key={task.id}  
              />
            )}
          
        </div>
    )
  }
}

Tasks = observer(Tasks)