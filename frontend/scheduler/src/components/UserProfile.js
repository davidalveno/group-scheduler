import React from 'react';
import PropTypes from 'prop-types';
import '../css/UserProfile.css';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            email: props.user.email,
            username: props.user.username,
            editing: false
        }
        console.log(this.state);
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


    render () {
        return (
            <div className="user-profile">
                <form>
                <div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="username" name="username" value={this.state.username} onChange={this.handle_change} autoComplete="false" disabled={true} />
                        <label className="mdl-textfield__label" htmlFor="username">Username</label>
                    </div>
                </div>
                <div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handle_change} autoComplete="false" disabled={!this.state.editing}/>
                        <label className="mdl-textfield__label" htmlFor="first_name">First Name</label>
                    </div>
                </div>
                <div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handle_change} autoComplete="false" disabled={!this.state.editing}/>
                        <label className="mdl-textfield__label" htmlFor="last_name">Last Name</label>
                    </div>
                </div>
                <div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="email" name="email" value={this.state.email} onChange={this.handle_change} autoComplete="false" disabled={!this.state.editing}/>
                        <label className="mdl-textfield__label" htmlFor="email">Email</label>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default UserProfile;