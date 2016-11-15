import React, { Component, PropTypes } from 'react';

class RepBio extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
      let { name, bioID, index } = this.props;
      return (
        <div key={index}>
          <p className="rep-names">{ name }</p>
          <img src={`./img/bio_images/${ bioID }.png`} />
        </div>
      );
    }
}

export default RepBio;
