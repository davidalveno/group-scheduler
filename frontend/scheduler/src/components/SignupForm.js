import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
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

  componentDidMount () {
    window.componentHandler.upgradeDom();
  }

  componentDidUpdate () {
    window.componentHandler.upgradeDom();
  }

  render() {
    return (
      <div>
        <h4>Sign up for Scheduler!</h4>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="username" name="username" value={this.state.username} onChange={this.handle_change} autoComplete="false" />
            <label className="mdl-textfield__label" htmlFor="username">Username</label>
          </div>
        <div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="password" name="password" value={this.state.password} onChange={this.handle_change} autoComplete="false"/>
            <label className="mdl-textfield__label" htmlFor="password">Password</label>
          </div>
        </div>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={e=>this.props.handle_signup(e, this.state)}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};