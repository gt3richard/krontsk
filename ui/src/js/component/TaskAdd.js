import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';


export default class TaskAdd extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name: "",
          date: ""
      }

      this.handleFormInput = this.handleFormInput.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  handleFormInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  add = () => {
    if(this.state.name && this.state.date) {
      this.props.store.addTask(this.state.name, this.state.date)
      this.setState({"name": "", "date": ""})
    }
  }

  handleKeyInput = event => {
    if (event.key === 'Enter') {
      this.add()
    }
  }

  onChange = event => {
    this.add()
  }

  render() {
    const add = [
      <div className="input-group-append" key="add">
          <button className="btn btn-outline-dark" onClick={this.onChange} type="button" id="button-addon2">
              <i className="fas fa-plus task-add"></i>
          </button>
      </div>
    ]

    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3 task">
                {add}
                <input type="text" value={this.state.name} onChange={this.handleFormInput} onKeyPress={this.handleKeyInput} id="name" className="form-control task-item" placeholder="Task name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <input type="text" value={this.state.date} onChange={this.handleFormInput} onKeyPress={this.handleKeyInput} id="date" className="form-control task-item" placeholder="Date" aria-label="Recipient's username" aria-describedby="button-addon2" />
            </div>
          </div>
        </div>
    )
  }
}