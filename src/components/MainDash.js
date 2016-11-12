import React from 'react';
import Relay from 'react-relay';


class MainDash extends React.Component {

  handleClick = () => {
    this.props.relay.setVariables({
      zipcode: this.refs.input.value
    })
  }

  getSenators = () => {
    let { senators } = this.props.data;
    if (!senators) return null;
    return senators.map((senator, index) => {
      return (
        <div key={index}>
          <p>{ senator.firstName } { senator.lastName }</p>
          <img src={`./img/bio_images/${ senator.bioID }.png`} />
        </div>
      )
    })
  }

  render() {
    console.log(this.props.data);
    return (
      <div>
        <input type="text" placeholder="Enter ZIP code" ref="input" />
        <button onClick={this.handleClick}>Go</button>
        { this.getSenators() }
      </div>
    );
  }

}

export default Relay.createContainer(MainDash, {
  initialVariables: {
    zipcode: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        senators(zipcode: $zipcode) {
          firstName
          lastName
          bioID
        }
      }
    `
  }
});
