import React, { Component } from 'react';

class Loader extends Component {

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        window.componentHandler.upgradeDom();
    }
    
    render() {
        return (
            // MDL Spinner Component
            <div className="mdl-spinner mdl-js-spinner is-active"></div>
        )
    }
}

export default Loader;