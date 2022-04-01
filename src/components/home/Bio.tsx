import styled from 'styled-components';

export const Bio = styled.div.attrs({
  className: `
    relative
    flex
    flex-col
    items-center
    rounded-lg
    bg-slate-900
    p-4
    mb-5
    lg:mb-0
` })`
  height: 400px;
  @media only screen and (max-width: 1023px) {
    width: 560px;
    height: auto;
  }
  & .pic {
    height: 70px;
  }
`;
