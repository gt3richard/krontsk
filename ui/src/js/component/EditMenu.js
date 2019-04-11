import React, { Component } from 'react';
import {observer} from "mobx-react"
import '../../assets/App.scss';
import '../../assets/Tasks.scss';

export default class EditMenu extends Component {
  constructor(props) {
    super(props);

    this.onClickSimpleMode = this.onClickSimpleMode.bind(this)
    this.onChangeResetMode = this.onChangeResetMode.bind(this)
  }

  onClickSimpleMode(event) {
    if(this.props.store.stateMode === 'simple') {
      this.props.store.stateMode = 'complex'
    } else {
      this.props.store.stateMode = 'simple'
    }
  }

  onChangeResetMode(event) {
    if(this.props.store.resetMode === 'monthly') {
      this.props.store.resetMode = '10days'
    } else {
      this.props.store.resetMode = 'monthly'
    }
  }

  render() {
    const stateMode = [
      <div className="stateMode" key="stateMode">
        <button type="button" className={this.props.store.stateMode === 'simple' ? "btn btn-primary active" : "btn btn-primary"} onClick={this.onClickSimpleMode} data-toggle="button">
          Simple Mode
        </button>
      </div>
    ]

    const resetMode = [
      <div className="resetMode" key="resetMode">
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

      if(this.props.store.edit) {
        return (
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
        )
      } else {
        return <div className="editMenu" key="editMenu"></div>
      } 
  }
}

EditMenu = observer(EditMenu)