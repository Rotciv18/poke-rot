import styled from 'styled-components';

export const Container = styled.div`
  .image-container {
    width: 90px;
    height: 90px;

    img {
      position: absolute;
      width: 150px !important;
      height: 150px !important;
      overflow: hidden;
      z-index: -1;
    }
  }

  .button-container {
    button {
      width: 60px;
      height: 30px;
      font-size: 10px;
      display: flex;
      align-items: center;
    }
  }
`;

export const LoadingContainer = styled.div`
  height: 400px;
`