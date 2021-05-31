import React, { Component } from 'react';

// import { Container } from './styles';

class TestPage extends Component {

  constructor(props) {
    super(props)

    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
    this.twitch = window.Twitch ? window.Twitch.ext : null
  }

  render() {
    return (
      <>
        <button type="button" onClick={() => this.props.history.push('/')}>testeeeeeeeeeeeeeeeeeeeeeeeeee</button>
        <button type="button" onClick={() => this.props.history.push('/another_test')}>To another test</button>
        <button type="button" onClick={() => this.twitch.rig.log(this.props.history.location)}>Print location</button>
      </>
    );
  }

}

export default TestPage;