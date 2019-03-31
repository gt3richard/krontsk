import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';

const stateIconMap = {
  "done": "fas fa-check done task-icon",
  "working": "fas fa-hourglass-half working task-icon",
  "not-done": "fas fa-check not-done task-icon"
}

const stateFlowMap = {
  "working": "done",
  "done": "not-done",
  "not-done": "working"
}

export default class Task extends Component {
  constructor(props) {
      super(props);

      this.state = {
          stateIcon: "fas fa-check not-done task-icon"
      }

      this.setStateIcon = this.setStateIcon.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setStateIcon(this.props.state)
  }

  setStateIcon = state => {
    this.setState({ "stateIcon": stateIconMap[state]})
  }

  onChange = event => {
    const task = this.props.store.getTask(this.props.id)
    this.props.store.updateTask(task.id, stateFlowMap[task.state])
    this.setStateIcon(task.state)
  }
    
  render() {

    const drag = [
      <div className="input-group-prepend" key="drag">
        <span className="input-group-text task-item" id="addon-wrapping">
          <i className="fas fa-bars task-drag"></i>
        </span>
      </div>
    ]

    const state = [
      <div className="input-group-append" key="state">
          <button className="btn btn-outline-dark task-mark" type="button" id="button-addon2" onClick={this.onChange}>
            <i className={this.state.stateIcon}></i>
          </button>
      </div>
    ]

    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3 task"> 
                {drag}
                <label type="text" className="form-control task-item" aria-label="Recipient's username" aria-describedby="button-addon2" >{this.props.name}</label>
                <label type="text" className="form-control task-item" aria-label="Recipient's username" aria-describedby="button-addon2" >{this.props.date}</label>
                {state}
            </div>
          </div>
        </div>
    )
  }
}
