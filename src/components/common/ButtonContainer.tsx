import styled from 'styled-components';

export const ButtonContainer = styled.div.attrs({
  className: `
  absolute
  flex
  justify-end
  w-full
  bottom-3
  right-3
` })`
  & > button {
    margin-left: 1rem;
  }
`;
