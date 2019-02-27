import React from 'react';
import { observer } from 'mobx-react';
import AWS from 'aws-sdk';
import logo from '../../asset/image/logo.svg';
import '../../asset/style.css';
import Amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:6a3e316e-4499-457d-a987-3c09f6bba521', 
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_LdXXPDqxv',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '31vrsnu30qa0rpg7qlofb932cn', 
    }
});

@observer class Tasker extends React.Component {
  render () {
    return (
        <div className="App">
        <Authenticator>
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
          </Authenticator>
        </div>
    );
  }
}

module.exports = Tasker;
