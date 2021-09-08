import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  flex-direction: column;
  align-items: center;

  span {
    font-weight: 700;
    color: #777777;
  }

  p {
    font-size: 14px;
  }

  .jiromba {
    font-size: 4px !important;
  }

  button {
    padding: 0;
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
`;
