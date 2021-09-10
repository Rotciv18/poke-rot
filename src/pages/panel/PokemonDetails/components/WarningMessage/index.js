import React from 'react';

import { Container } from './styles';

function WarningMessage({message, color, bold}) {
  return <Container>
    <span style={{color: color ? color : '', fontWeight: bold ? 700 : ''}}>{message}</span>
  </Container>;
}

export default WarningMessage;