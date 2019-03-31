import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';


export default class Task extends Component {
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
            <div class="input-group mb-3 task">
                <div class="input-group-append">
                    <button class="btn btn-outline-dark" type="button" id="button-addon2">
                        <i className="fas fa-plus task-add"></i>
                    </button>
                </div>
                <input type="text" class="form-control task-item" placeholder="Task name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <input type="text" class="form-control task-item" placeholder="Date" aria-label="Recipient's username" aria-describedby="button-addon2" />
            </div>
          </div>
        </div>
    )
  }
}
