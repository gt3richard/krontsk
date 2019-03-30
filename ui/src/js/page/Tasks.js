import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';

export default class Tasks extends Component {
  
  render() {

    const TaskItem = (taskName, date) => {
      return [
        <div className="card mb-3">
          <div className="row card-body">
            <div className="col-2">
              <i className="fas fa-bars task-item task-drag"></i>
            </div>
            <div className="col-4">
              <h5 className="card-text task-item task-name">{taskName}</h5>
            </div>
            <div className="col-4">
              <h5 className="card-text task-item task-date">{date}</h5>
            </div>
            <div className="col-2">
              <a href="#" className="btn btn-success task-item task-mark">
                <i className="fas fa-check"></i>
              </a>
            </div>
          </div>
        </div>
      ]
    }


    return(
        <div className="tasklist">
          {TaskItem("Task 1", "15th")}
          {TaskItem("Task 2", "18th")}
        </div>
    )
  }
}
