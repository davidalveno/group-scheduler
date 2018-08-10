import React from 'react';
import PropTypes from 'prop-types';
import '../css/LoginForm.css';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className='login-form'>
        <form>
          <h4>Log In</h4>
          <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="username" name="username" value={this.state.username} onChange={this.handle_change} />
              <label className="mdl-textfield__label" htmlFor="username">Username</label>
            </div>
          </div>
          <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="password" name="password" value={this.state.password} onChange={this.handle_change} />
              <label className="mdl-textfield__label" htmlFor="password">Password</label>
            </div>
          </div>
          <div>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={e => this.props.handle_login(e, this.state)}>
              Login
            </button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.props.go_to_signup}>
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};