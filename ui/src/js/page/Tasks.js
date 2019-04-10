import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

import Task from '../component/Task.js'
import TaskAdd from '../component/TaskAdd.js'

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.onClickSimpleMode = this.onClickSimpleMode.bind(this)
    this.onChangeResetMode = this.onChangeResetMode.bind(this)
  }

  onClickSimpleMode(event) {
    console.log('Clicked Simple Mode')
  }

  onChangeResetMode(event) {
    console.log(event)
  }

  render() {
    const sortByDate = (a, b) => {
      return a.date - b.date
    }

    const stateMode = [
      <div className="stateMode">
        <button type="button" className="btn btn-primary" onClick={this.onClickSimpleMode} data-toggle="button">
          Simple Mode
        </button>
      </div>
    ]

    const resetMode = [
      <div className="resetMode">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label 
            className={this.props.store.resetMode === 'monthly' ? "btn btn-secondary active": "btn btn-secondary"} 
            onClick={this.onChangeResetMode}
            value="monthly"
            >
            Monthly
            <input type="radio" name="options" id="monthly"/>
          </label>
          <label 
            className={this.props.store.resetMode === '10days' ? "btn btn-secondary active": "btn btn-secondary"}
            onClick={this.onChangeResetMode}
            value="10days"
            >
            10 Days
            <input type="radio" name="options" id="10days" />
          </label>
        </div>
      </div>
    ]

    const editMenu = () => {
      if(this.props.store.edit) {
        return [
          <div className="editMenu" key="editMenu">
            <div className="row">
              <div className="col-sm-6">
                <div className="card mb-3 edit">
                  <div className="card-body edit">
                    <h5 className="card-title edit">Modes</h5>
                    <p className="card-text edit">Switch to a simplier mode.</p>
                    {stateMode}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card mb-3 edit">
                  <div className="card-body edit">
                    <h5 className="card-title edit">Reset Frequency</h5>
                    <p className="card-text edit">Set the frequency that tasks will be reset.</p>
                    {resetMode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ]
      } else {
        return <div className="editMenu" key="editMenu"></div>
      }
    }
      
    if(this.props.store.isAuthenticated) {
      return(
          <div className="tasklist">
            <div className="edit">
              {editMenu()}
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
        <div className="tasklist"></div>
      )
    }

    
  }
}

Tasks = observer(Tasks)