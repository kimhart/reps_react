import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Template extends React.Component {

  render() {
    return (
      <div>
        {/* Header goes here */}
        <ul className="header">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/">Dashboard</Link></li>
        </ul>
        <div>
          { this.props.children }
        </div>
        {/* Footer goes here */}
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
