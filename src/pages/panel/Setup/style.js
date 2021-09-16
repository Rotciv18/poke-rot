import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 8px;
  margin: 0px 12px 0 12px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .hover:hover {
    transition: 0.3s;
    background-color: #0088ff;

    .icon-hover {
      transition: 0.3s;
      background-color: #0044ff;
    }
  }

  .code {
    white-space: pre-wrap;
  }
`;
