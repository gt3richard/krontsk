import React, { Component } from 'react';
import '../../assets/App.css';
import '../../assets/Tasks.css';


export default class Task extends Component {
  constructor(props) {
      super(props);

      this.state = {
          state: "not-done",
          stateIcon: "fas fa-check not-done task-icon"
      }
  }

  onChange = (event) => {
    switch(this.state.state) {
        case "working":
            this.setState({ "state": "done", "stateIcon": "fas fa-check done task-icon"})
            break;
        case "done":
            this.setState({"state": "not-done",  "stateIcon": "fas fa-check not-done task-icon"})
            break;
        default:
        case "not-done":
            this.setState({"state": "working", "stateIcon": "fas fa-hourglass-half working task-icon"})
            break;
    }
  }
    
  render() {
    return(
        <div className="card mb-3">
          <div className="row card-body">
            <div className="input-group mb-3 task"> 
              <div class="input-group-prepend">
                <span class="input-group-text task-item" id="addon-wrapping">
                  <i className="fas fa-bars task-drag"></i>
                </span>
              </div>
                <label type="text" className="form-control task-item" aria-label="Recipient's username" aria-describedby="button-addon2" >{this.props.name}</label>
                <label type="text" className="form-control task-item" aria-label="Recipient's username" aria-describedby="button-addon2" >{this.props.date}</label>
                <div className="input-group-append">
                    <button className="btn btn-outline-dark task-mark" type="button" id="button-addon2" onClick={this.onChange}>
                      <i className={this.state.stateIcon}></i>
                    </button>
                </div>
            </div>
          </div>
        </div>
    )
  }
}
