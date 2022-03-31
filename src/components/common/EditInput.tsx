import styled from 'styled-components';
import { PostInput } from './PostInput';

export const EditInput: any = styled(PostInput).attrs({
  placeholder: "",
  className: `
  mt-0
  mb-5
`
})`
  width: 92%;
`;
