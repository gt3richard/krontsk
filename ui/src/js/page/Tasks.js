import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import Intro from '../component/Intro.js'
import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'
import EditMenu from '../component/EditMenu.js'


export default class Tasks extends Component {

  render() {
    const sortByDate = (a, b) => {
      return a.date - b.date
    }

    if(this.props.store.isAuthenticated) {
      return(
          <div className="tasklist">
            <div className="edit">
              <EditMenu store={this.props.store} />
            </div> 
            <div className="tasks">
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
          </div>
        )
    }
    else {
      return (
        <div className="tasklist">
          <Intro />
        </div>
      )
    }

    
  }
}

Tasks = observer(Tasks)