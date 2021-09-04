import styled from 'styled-components';

export const Container = styled.div`
  background-color: #000022;
`;

export const PokeRotContainer = styled.div`
  background-color: #0088ff;
  padding: 0 8px 0 8px;

  display: flex;
  justify-content: space-between;

  img {
    width: 16px;
    height: 16px;
  }

  div {
    display: flex;
    flex-direction: column;

    a {
      font-weight: bold;
      cursor: pointer;
      color: #0000ff;
    }
  }
`;