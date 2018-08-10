import React from 'react';
import PropTypes from 'prop-types';
import '../css/SignupForm.css';

class SignupForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      passwords_match: true
    };
    this.signup = this.signup.bind(this);
  }

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

  signup (event) {
    event.preventDefault();
    // Check that passwords match.
    var newState = Object.assign({}, this.state);
    if (this.state.password !== this.state.confirm_password) {
      newState.passwords_match = false;
      this.setState(newState);
      console.log(this.state);
    }
    else {
      let data = {
        username: this.state.username,
        password: this.state.password
      }
      this.props.handle_signup(data);
      console.log('creating user...')
    }
  }

  render() {
    return (
      <div className="signup-form">
        <form>
          <h4>Sign up for Scheduler!</h4>
          <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="username" name="username" value={this.state.username} onChange={this.handle_change} autoComplete="false" />
              <label className="mdl-textfield__label" htmlFor="username">Username</label>
            </div>
          </div>
          <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="password" id="password" name="password" value={this.state.password} onChange={this.handle_change} autoComplete="false"/>
              <label className="mdl-textfield__label" htmlFor="password">Password</label>
            </div>
          </div>
          <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="password" id="confirm_password" name="confirm_password" value={this.state.confirm_password} onChange={this.handle_change} autoComplete="false"/>
              <label className="mdl-textfield__label" htmlFor="confirm_password">Confirm Password</label>
              {
                !this.state.passwords_match &&
                <span className="mdl-textfield__error">Passwords do not match</span>
              }
            </div>
          </div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={(e)=>this.signup(e)}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};