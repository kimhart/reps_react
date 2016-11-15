import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';

class MainDash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {zipcode: null}
  }

  handleClick = () => {
    // this.props.relay.setVariables({
    //   zipcode: this.refs.input.value
    // })
    this.setState({
      zipcode: this.refs.input.value
    })
  }

  getReps = (reps) => {
    if (!reps) return null;
    return reps.map((rep, index) => {
      return (
        <RepBio name={rep.name} bioID={rep.bioID} key={index} />
      )
    })
  }

  render() {
    let { congresspeople } = this.props.data;
    return (
      <div>
        <input type="text" placeholder="Enter ZIP code" ref="input" />
        <button onClick={this.handleClick}>Go!</button>
        <Senators {...this.props} {...this.state} />
        {/* this.getReps(congresspeople) */}
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
        ${Senators.getFragment('data')}
        congresspeople(zipcode: $zipcode) {
          name
          bioID
        }
      }
    `
  }
});
