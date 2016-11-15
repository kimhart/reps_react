import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import MainDash from './MainDash';

class ZipcodeForm extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

   handleClick = () => {
      console.log('clicked');
      this.setState({
        zipcode: this.refs.input.value
      })
    }

    render() {
        return (
          <div className="zipform-container">
            <input onSubmit={this.handleClick} type="text" placeholder="Enter ZIP code" ref="input" />
            <button onClick={this.handleClick}>Go!</button>
          </div>
        );
    }
}

export default ZipcodeForm;
