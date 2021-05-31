import React, { Component } from 'react';

// import { Container } from './styles';

class AnotherTest extends Component {

  render() {
    const {Twitch} = this.props;
    return (
      <>
        <button type="button" onClick={() => this.props.history.push('/test')}>To test</button>
        <button type="button" onClick={() => this.props.history.push('/another_test')}>To another test</button>
        <button type="button" onClick={() => Twitch.rig.log('OIEEEE')}>Twitch test</button>
        <button type="button" onClick={() => console.log(this.props)}>debug</button>
      </>
    );
  }

}

export default AnotherTest;