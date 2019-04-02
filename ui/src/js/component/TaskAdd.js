import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns/esm'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';



export default class TaskAdd extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name: "",
          dateString: format(new Date('2019-01-01T00:00:00'), "do"),
          date: new Date('2019-01-01T00:00:00')

      }

      this.handleFormInput = this.handleFormInput.bind(this)
      this.handleKeyInput = this.handleKeyInput.bind(this)
      this.handleDateChange = this.handleDateChange.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  handleFormInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  add = () => {
    if(this.state.name && this.state.date) {
      this.props.store.addTask(this.state.name, this.state.dateString)
      this.setState({"name": "", "date": new Date('2019-01-01T00:00:00'), "dateString": format(new Date('2019-01-01T00:00:00'), "do")})
    }
  }

  handleDateChange(date) {
    this.setState({ date: date, dateString: format(date, "do")});
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
                <input type="text" value={this.state.name} onChange={this.handleFormInput} onKeyPress={this.handleKeyInput} id="name" className="form-control task-item task-add-title" placeholder="Task name" aria-label="Recipient's username" autocomplete="off" aria-describedby="button-addon2" />
                <div className="date-picker">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      format={"do"}
                    />
                  </MuiPickersUtilsProvider>
                </div>
            </div>
          </div>
        </div>
    )
  }
}
