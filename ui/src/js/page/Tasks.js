import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.css';
import '../../assets/Tasks.css';

import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'

export default class Tasks extends Component {
  
  render() {
    const sortByDate = (a, b) => {
      return a.date - b.date
    }
    
    if(this.props.store.isAuthenticated) {
      return(
          <div className="tasklist">
            <h2 className="task-heading">Not Done</h2>
            {this.props.store.tasks && this.props.store.tasks
              .filter(f => f.state !== 'done')
              .sort(sortByDate)
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
            {this.props.store.tasks && this.props.store.tasks
              .filter(f => f.state === 'done')
              .sort(sortByDate)
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
    else {
      return (
        <div className="tasklist"></div>
      )
    }

    
  }
}

Tasks = observer(Tasks)