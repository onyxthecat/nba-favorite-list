import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 600px;
  margin: 0 10px;
`;

export const ListContainer = styled.div<{ isLoading?: boolean }>`
  padding: 20px;
  background: linear-gradient(45deg, #ff6f00 30%, #ff9a00 90%);
  box-shadow: 0 3px 5px 2px rgba(255, 165, 0, 0.3);
  overflow-y: auto; 
  flex: 1;
  opacity: ${props => props.isLoading ? 0.5 : 1};
  transition: opacity 0.3s ease;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
`;