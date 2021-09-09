import styled from 'styled-components';

export const Container = styled.div`
  .listItem {
    border-radius: 8px;
    margin-bottom: 4px;
    padding: 0px 6px 0px 12px;
    width: 95%;
    margin-left: 8px;

    background-color: #F5F5F5;
  }
`;

export const SetupContainer = styled.div`
  img {
    width: 36px;
    height: 36px;
    overflow: hidden;
  }

  .pokemonImg {
    margin: 0px !important;
    padding: 0px !important;
    display: absolute;
    width: 24px;
    height: 20px;

    left: -2px;
    top: -5px;
  }

  .border {
    height: 80px;
    width: 60px;

    margin-right: 5px;
  }

  .listItemText {
    width: 10px !important;
  }
`;
