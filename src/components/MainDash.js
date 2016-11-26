import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';
import Congresspeople from './Congresspeople';

class MainDash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {zipcode: null}
  }

  handleClick = () => {
    this.setState({
      zipcode: this.refs.input.value
    })
  }

  // getReps = (reps) => {
  //   if (!reps) return null;
  //   return reps.map((rep, index) => {
  //     return (
  //       <RepBio name={rep.name} bioID={rep.bioID} key={index} />
  //     )
  //   })
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="zipform-container">
            <input type="text" placeholder="Enter ZIP code" ref="input" />
            <button onClick={this.handleClick}>Go!</button>
          </div>
       </div>
        <div className="row">
          <div className="col">
            <Senators {...this.props} {...this.state} />
          </div>
          <div className="col">
            <Congresspeople {...this.props} {...this.state} />          
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
        ${Senators.getFragment('data', )}
        ${Congresspeople.getFragment('data', )}
      }
    `
  }
});
