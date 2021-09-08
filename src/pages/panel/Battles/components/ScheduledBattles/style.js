import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;

  table {
    margin-bottom: 0;
    border-collapse:separate;
    // -webkit-border-radius: 25px !important;
    //    -moz-border-radius: 25px !important;
    //         border-radius: 25px 25px 0px 0px !important;

    th {
      background-color: transparent;
      border: transparent;
    }
  }

  .collapseButton {
    height: 10px;
    width: 100%;
    background-color: #777777;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #CCCCCC;
  }

  .collapseButton:hover {
    background-color: #999999;
    cursor: pointer;
  }

  .scheduleButton {
    display: flex;
    justify-content: center;
  }
`;
