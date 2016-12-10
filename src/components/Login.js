import React from 'react';
import Relay from 'react-relay';

class Login extends React.Component {

    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.state = {
        email: null, 
        password: null
      }
    }

    handleLogin = (event) => {
      event.preventDefault();
      this.setState({
        email: this.refs.emailInput.value,
        password: this.refs.passwordInput.value
      })
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <div className="form-container">
                <h2 className="page-title">Log In Now</h2>
                <form className="login-form" onSubmit={this.handleLogin}>
                  <input type="email" placeholder="Email" ref="emailInput" />
                  <input type="password" placeholder="Password" ref="passwordInput" />
                  <button type="submit">Log In</button>
                </form>
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

