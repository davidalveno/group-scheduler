import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Main from './components/Main';
import Loader from './components/Stuff';
import './css/material.css'
import './material.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_content: 'loading',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
    console.log('on startup - logged in: ', this.state.logged_in)
  }

  componentDidMount() {
    if (this.state.logged_in) {
      console.log('mounted: logged in')
      fetch('http://localhost:8000/scheduler/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          let newState = Object.assign({}, this.state);
          newState.username = json.username;
          newState.displayed_content = 'main';
          this.setState(newState);
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
        let newState = Object.assign({}, this.state);
        newState.logged_in = true;
        newState.displayed_content = 'main';
        newState.username = json.user.username;
        this.setState(newState);
        console.log('handle_login')
      });
  };

  handle_signup = (e, data) => {
    console.log(data);
    e.preventDefault();
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
        newState.username = json.username;
        this.setState(newState);
        console.log('handle_signup')
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    let newState = Object.assign({}, this.state);
    newState.logged_in = false;
    newState.displayed_content = 'login'
    newState.username= '';
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
        form = <LoginForm handle_login={this.handle_login} go_to_signup={this.go_to_signup} />;
        console.log('login page');
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        console.log('signup page');
        break;
      case 'main':
        form = <Main handle_logout={this.handle_logout}/>
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
      </div>
    );
  }
}

export default App;