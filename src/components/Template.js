import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Template extends React.Component {

  render() {
    return (
      <div>
        <div className="header">
          <div className="navbar row">
            <div className="twelve columns">
              <ul className="nav-list">
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          { this.props.children }
        </div>
        <div className="footer">
          {/* Footer goes here */}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Template, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
