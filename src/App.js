import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Template from './components/Template';
import MainDash from './components/MainDash';
import Login from './components/Login';


let RootQuery = {
  data: (Component) => Relay.QL`
    query RootQuery {
      data {
        ${Component.getFragment('data')}
      }
    }
  `
};

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
        <Route path="/" component={Template} queries={RootQuery}>
          <IndexRoute component={MainDash} queries={RootQuery} />
          <Route path="/login" component={Login} />
        </Route>
      </Router>
    );
  }

}

export default App;
