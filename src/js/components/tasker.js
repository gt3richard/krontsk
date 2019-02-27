import React from 'react';
import { observer } from 'mobx-react';
import AWS from 'aws-sdk';
import {Amplify, Auth} from 'aws-amplify';
import logo from '../../asset/image/logo.svg';
import '../../asset/style.css';
import { Authenticator, Greetings } from 'aws-amplify-react';

// Amplify.configure({
//   Auth: {
//       identityPoolId: 'us-west-2', // Amazon Cognito Identity Pool ID
//       region: 'us-west-2', // Amazon Cognito Region
//   }
// });

@observer class Tasker extends React.Component {
  render () {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/js/app.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            
          </header>
        </div>
    );
  }
}

module.exports = Tasker;
