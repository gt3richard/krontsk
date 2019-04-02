import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.css';
import '../../assets/Tasks.css';

export default class TaskEdit extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        date: "1"
      }

      this.handleFormInput = this.handleFormInput.bind(this)
  }

  componentDidMount() {
    this.setState({ "name": this.props.name, "date": this.props.date })
  }

  handleFormInput = event => {
    this.setState({ [event.target.id]: event.target.value }, function() {
        this.props.store.updateTask(this.props.id, this.state.name, this.state.date)
    });
  }

  handleDelete = event => {
    this.props.store.deleteTask(this.props.id)
  }
    
  render() {
    const options = Array.from(Array(31).keys()).map(m => {
        const date = (m+1).toString()
        return <option key={m} value={date}>{this.props.store.month[date]}</option>
    })

    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3 task"> 
                <input type="text" 
                    value={this.state.name} 
                    onChange={this.handleFormInput} 
                    onKeyPress={this.handleKeyInput} 
                    id="name" 
                    className="form-control task-item task-add-title" 
                    placeholder="Task name" 
                    autocomplete="off" 
                />
                <select className="task-add-date" 
                    id="date"
                    value={this.state.date} 
                    onChange={this.handleFormInput}
                >
                  {options}
                </select>
                <div className="input-group-append" key="delete">
                  <button className="btn btn-outline-dark task-mark" 
                    type="button" 
                    onClick={this.handleDelete}>
                    <i className="far fa-trash-alt"></i>
                  </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

TaskEdit = observer(TaskEdit)