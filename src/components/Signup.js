import React from 'react';
import Relay from 'react-relay';


class Signup extends React.Component {

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
      this.state = {
        email: null, 
        password: null,
        street: null,
        zipcode: null,
        gender: 'Gender',
        dob: null
      }
    }

    handleChange(event) {
      this.setState({
        gender: event.target.value
      });
    }

    handleSignup(event) {
      event.preventDefault();
      this.setState({
        email: this.refs.emailInput.value,
        password: this.refs.passwordInput.value,
        street: this.refs.streetInput.value,
        zipcode: this.refs.zipcodeInput.value,
        gender: this.refs.genderInput.value,
        dob: this.refs.dobInput.value
      })
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <h2 className="page-title">Sign Up</h2>
              <form className="login-form" onSubmit={this.handleSignup}>
                <input type="email" placeholder="Email" ref="emailInput" />
                <input type="password" placeholder="Password" ref="passwordInput" />
                <input type="text" placeholder="Street Address" ref="streetInput" />
                <input type="text" placeholder="ZIP code" ref="zipcodeInput" />
                <select className="placeholder" value={this.state.gender} onChange={this.handleChange} ref="genderInput">
                  <option disabled>Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="NA">Rather not say</option>
                </select>
                <input type="date" name="dob" ref="dobInput"/>
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

export default Relay.createContainer(Signup, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});


