import React from 'react';
import Relay from 'react-relay';

class Login extends React.Component {

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <h3>Login</h3>
              <div className="zipform-container">
                <input type="text" placeholder="Username" ref="input" />
                <input type="text" placeholder="Password" ref="input" />
                <button>Login</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Relay.createContainer(Login, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
