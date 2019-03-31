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
  }

  render() {
    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3 task">
                <div className="input-group-append">
                    <button className="btn btn-outline-dark" type="button" id="button-addon2">
                        <i className="fas fa-plus task-add"></i>
                    </button>
                </div>
                <input type="text" className="form-control task-item" placeholder="Task name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <input type="text" className="form-control task-item" placeholder="Date" aria-label="Recipient's username" aria-describedby="button-addon2" />
            </div>
          </div>
        </div>
    )
  }
}
