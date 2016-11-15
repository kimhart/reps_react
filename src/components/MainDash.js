import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';
import ZipcodeForm from './ZipcodeForm';

class MainDash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {zipcode: null}
  }

  // handleClick = () => {
  //   this.setState({
  //     zipcode: this.refs.input.value
  //   })
  // }

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
      <div className="container">
        <div className="row">
          <ZipcodeForm />
        </div>
        <div className="row">
          <div className="col">
            <Senators {...this.props} {...this.state} />
          </div>
          <div className="col">
            {/* this.getReps(congresspeople) */}
          </div>
        </div>
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
