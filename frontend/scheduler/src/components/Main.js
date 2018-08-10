import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile.js'
import Events from './Events.js'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.first_name
    }
  }

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
  }

  changeView(e, view_name) {
    e.preventDefault();
    var newState = Object.assign({}, this.state);
    newState.displayed_content = view_name;
    this.setState(newState);
  }


  render() {
    let form;
    switch (this.state.displayed_content) {
      case 'main':
        form = <Events/>;
        break;
      case 'profile':
        form = <UserProfile user={this.props.user}/>;
        console.log('viewing user profile');
        break;
      default:
        form =<Events/>;
        break;
    }

    return (
      // <!-- Always shows a header, even in smaller screens. -->
      <div className="Main">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              {/* <!-- Title --> */}
              <span className="mdl-layout-title">Scheduler</span>
              {/* <!-- Add spacer, to align navigation to the right --> */}
              <div className="mdl-layout-spacer"></div>
              {/* <!-- Navigation. We hide it in small screens. --> */}
              <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link" onClick={(e) => this.changeView(e, 'profile')}>Profile</a>
                <a className="mdl-navigation__link">Events</a>
                <a className="mdl-navigation__link">Groups</a>
                <a className="mdl-navigation__link" onClick={this.props.handle_logout}>Logout</a>
              </nav>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Username</span>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" onClick={(e) => this.changeView(e, 'profile')}>Profile</a>
              <a className="mdl-navigation__link">Events</a>
              <a className="mdl-navigation__link">Groups</a>
              <a className="mdl-navigation__link" onClick={this.props.handle_logout}>Logout</a>
            </nav>
          </div>
          <main className="mdl-layout__content">
            <div className="page-content">
              {form}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;

Main.propTypes = {
  handle_logout: PropTypes.func.isRequired
};