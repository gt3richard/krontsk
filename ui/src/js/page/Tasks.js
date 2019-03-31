import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.css';
import '../../assets/Tasks.css';

import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'

export default class Tasks extends Component {
  
  render() {

    return(
        <div className="tasklist">
          {this.props.store.tasks.map((task) => 
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
        </div>
    )
  }
}

Tasks = observer(Tasks)