import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid black;
  border-radius: 8px;

  margin: 24px 12px 0 12px;

  .hover:hover {
    transition: 0.3s;
    background-color: #0088ff;

    .icon-hover {
      transition: 0.3s;
      background-color: #0044ff;
    }
  }
`;
