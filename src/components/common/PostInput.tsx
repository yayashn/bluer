import styled from 'styled-components';

export const PostInput = styled.textarea.attrs({
  placeholder: "What's up?",
  className: `
    bg-transparent
    resize-none
    w-8/12
    h-full
    mt-2
`
})`
  min-height: 96px;
  outline: none;
`;
