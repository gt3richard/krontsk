import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer } from 'mobx-react';
import '../assets/App.css';
import Tasks from './page/Tasks'

class Home extends Component {

  Tasks() {
      return <Tasks />
  }

  render() {
    return (
        <div className="App">
        <Router>
            <Route exact={true} path="/" component={Tasks} />
        </Router>
      </div>
    );
  }
}

export default Home;
