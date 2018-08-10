import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Main from './components/Main';
import Loader from './components/Stuff';
import './css/material.css';
import './material.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_content: 'loading',
      logged_in: localStorage.getItem('token') ? true : false,
      failed_login: false,
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: ''
      }
    };
    console.log('on startup - logged in: ', this.state.logged_in)
  }

  componentDidMount() {
    let self = this;
    let newState = Object.assign({}, self.state);
    if (this.state.logged_in) {
      fetch('http://localhost:8000/scheduler/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          // If we don't get a username in the response, then the token is probably expired.
          if (!json.username) {
            localStorage.removeItem('token');
            newState.logged_in = false;
            self.setState(newState);
          }
          newState.user.username = json.username;
          newState.user.first_name = json.first_name;
          newState.user.last_name = json.last_name;
          newState.user.email = json.email;
          newState.displayed_content = 'main';
          self.setState(newState);
          console.log('componentDidmount');
        });
    }
    else {
      let newState = Object.assign({}, this.state);
      newState.displayed_content = 'login';
      this.setState(newState);
    }
  }

  handle_login = (e, data) => {
    let newState = Object.assign({}, this.state);
    e.preventDefault();
    console.log(data);
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        newState.logged_in = true;
        newState.displayed_content = 'main';
        newState.user.username = json.user.username;
        this.setState(newState);
        console.log('handle_login');
      }).catch((error)=>{
        console.log('Failed to login');
        localStorage.removeItem('token');
        newState.logged_in = false;
        newState.displayed_content = 'login';
        newState.user.username = '';
        // Show the error via toast notification
        var notification = document.querySelector('.mdl-js-snackbar');
        var data = {
          message: 'Wrong username and password combination',
          timeout: 5000
        }
        notification.MaterialSnackbar.showSnackbar(data);
      });
  };

  handle_signup = (data) => {
    console.log(data);
    fetch('http://localhost:8000/scheduler/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        let newState = Object.assign({}, this.state);
        newState.logged_in = true;
        newState.displayed_content = 'main';
        newState.user.username = json.username;
        this.setState(newState);
        console.log('handle_signup')
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    let newState = Object.assign({}, this.state);
    newState.logged_in = false;
    newState.displayed_content = 'login'
    newState.user.username= '';
    this.setState(newState);
  };

  display_form = form => {
    let newState = Object.assign({}, this.state);
    newState.displayed_content = form;  
    this.setState(newState);
    console.log('display_form')
  };

  go_to_signup = () => {
    let newState = Object.assign({}, this.state);
    newState.displayed_content = 'signup';
    this.setState(newState);
  };

  render() {
    let form;
    switch (this.state.displayed_content) {
      case 'loading':
        form = <Loader/>;
        break;
      case 'login':
        form = <LoginForm handle_login={this.handle_login} go_to_signup={this.go_to_signup} failed_login={this.state.failed_login}/>;
        console.log('login page');
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        console.log('signup page');
        break;
      case 'main':
        form = <Main handle_logout={this.handle_logout} user={this.state.user}/>
        console.log('main');
        break;
      default:
        form = <LoginForm handle_login={this.handle_login} />;
        console.log('login page (default)');
        break;
    }

    return (
      <div className="App">
        {form}
        {/* This toast is used throughout the entire app */}
        <div id="toast" className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text"></div>
          <button className="mdl-snackbar__action" type="button"></button>
        </div>
      </div>
    );
  }
}

export default App;