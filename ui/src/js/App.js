import React, { Component } from 'react';
import '../assets/App.css';
import Authentication from "./auth/Authentication"
import Home from './Home'
import store from '../store/TaskStore';

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

class App extends Component {

  render() {
    return (
      <div className="app" >
          <Authentication />
          <Home store={store}/>
      </div>
    );
  }
}

export default App;
