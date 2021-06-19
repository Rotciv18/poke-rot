import React from 'react';

import { Container } from './styles';

function WarningMessage({message, color}) {
  return <Container>
    <span style={{color: color ? color : ''}}>{message}</span>
  </Container>;
}

export default WarningMessage;