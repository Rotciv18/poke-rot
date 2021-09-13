import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow-x: hidden;

  .itemImg {
    height: 60px;
    width: 60px;
  }

  .card:hover {
    transition: 0.3s;
    background-color: #0088ff;
  }

  .pokePoints {
    width: 15px;
    height: 15px;
  }
`;
