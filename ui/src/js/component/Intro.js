import React, { Component } from 'react';
import '../../assets/App.scss';
import '../../assets/Intro.scss';

export default class Intro extends Component {

  render() {
    return (
        <div className="intro">
            <div className="intro-title">
                <h2>Simple Task Management</h2>
                <p>A simplier way to manage recurring tasks.</p>
            </div>
            <hr/>
            <div className="intro-block">
                <p>Just enter a name and select the day of the month your task is due.</p>
                <img src="taskList.png" width="400vw" max-width="600px" height="auto" alt="" />
            </div>
            <hr/>
            <div className="intro-block">
                <p>Have you tasks automatically reset at the end of the 
                    month, 10 days prior to them being due, or manage it yourself.</p>
                <img src="editMenu.png" width="400vw" max-width="600px" height="auto" alt="" />
            </div>
            <footer>
                <div className="footer">© 2019 by krontsk</div>
            </footer>
        </div>
    )
  }
}