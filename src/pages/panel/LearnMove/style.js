import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: hidden;

  img {
    height: 90px;
  }

  .card:hover {
    transition: 0.3s;
    background-color: #0088ff;
    color: white !important;
  }

  .moves-container {
    width: 100%;
    padding: 0px 6px 0px 6px;
  }
`;

export const LoadingContainer = styled.div`
  height: 400px;
`