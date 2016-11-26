import React, { Component, PropTypes } from 'react';

class ZipcodeForm extends Component {
    static propTypes = {
      className: PropTypes.string,
    };

    constructor(props) {
      super(props);
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
