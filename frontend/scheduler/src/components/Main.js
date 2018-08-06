import React from 'react';
import PropTypes from 'prop-types';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
  }

  render() {
    return (
      // Always shows a header, even in smaller screens.
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            {/* Title */}
            <span className="mdl-layout-title">Title</span>
            {/*  Add spacer, to align navigation to the right */}
            <div className="mdl-layout-spacer"></div>
            {/* Navigation. We hide it in small screens. */}
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" onClick={this.props.handle_logout}>Logout</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            Welcome, you are logged in!
          </div>
        </main>
      </div>
    );
  }
}

export default Main;

Main.propTypes = {
  handle_logout: PropTypes.func.isRequired
};