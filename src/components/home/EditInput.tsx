import styled from 'styled-components';
import { PostInput } from './PostInput';

export const EditInput: any = styled(PostInput).attrs(props => ({
  placeholder: props.defaultValue
}))`
  width: 92%;
  margin: 0;
  margin-bottom: 40px;
`;
