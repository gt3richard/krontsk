import React, { PureComponent } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify from "./Verify";
import Forgot from "./Forgot";
import ForgotVerify from "./ForgotVerify";

import { Auth } from "aws-amplify";

export default class Authentication extends PureComponent {
  state = {
    username: "",
    email: "",
    password: "",
    phone_number: "",
    code: "",
    user: null, // will contain our user data object when signed in
    status: "",
    errorMessage: ""
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(data => {
        let user = {username:data.username,...data.attributes}
        if(user.email_verified) this.setState({user, status:"Authenticated"}) 
        else this.setState({user, status:"SignIn"})
      })
      .catch(err => console.log(err));
  }

  handleLogout = event => {
    event.preventDefault();
    Auth.signOut(
    )
    .then(data => console.log(data))
      .then(()=>this.switchComponent("SignIn"))
      .catch(err => {
        console.log(err)
      })
  }

  // Handle changes to form inputs on sign-up, verification and sign-in
  handleFormInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      'errorMessage': ''
    });
  };

  handleErrorMessage = errorMessage => {
    this.setState({ errorMessage });
  }

  Navigation = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">Krontsk</a>
            <input
              hidden = {this.state.status !== 'Authenticated'}
              type="button" 
              className="btn btn-outline-dark my-2 my-sm-0" 
              onClick={this.handleLogout} 
              value="Logout"
            />
          </nav>
    );
  }

  AuthComponent = () => {
    switch (this.state.status) {
      case "SignUp":
        return (
          <SignUp
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            inputs={this.state}
          />
        );
        
      case "Verify":
        return (
          <Verify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );
        
      case "SignIn":
        return (
          <SignIn
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            inputs={this.state}
          />
        );

      case "Forgot":
        return (
          <Forgot
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            inputs={this.state}
          />
        );

      case "ForgotVerify":
        return (
          <ForgotVerify
            switchComponent={this.switchComponent}
            handleFormInput={this.handleFormInput}
            handleErrorMessage={this.handleErrorMessage}
            inputs={this.state}
          />
        );
      default:
        return <div />;
    }
  };
  switchComponent = status => {
    this.setState({ status, 'errorMessage': '' });
  };
  render() {
    if(this.state.status === 'Authenticated' || this.state.status === '') {
      return (
        <div>
          {this.Navigation()}
        </div>
      )
    }
    else {
      return (
        <div>
         {this.Navigation()}
          <div className="jumbotron">
            <div className="container" >
              {this.AuthComponent()}
            </div>
          </div>
        </div>
      ) 
    }
  }
}