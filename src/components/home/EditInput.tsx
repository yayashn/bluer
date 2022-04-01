import styled from 'styled-components';
import { PostInput } from './PostInput';

export const EditInput: any = styled(PostInput).attrs({
  placeholder: "",
  className: `
  mb-5
`
})`
  width: 92%;
  margin-top: 0;
`;
