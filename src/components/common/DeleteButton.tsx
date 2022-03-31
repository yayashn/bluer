import styled from 'styled-components';
import { NormalButton } from './NormalButton';

export const DeleteButton: any = styled(NormalButton).attrs({
  whileHover: {
    backgroundColor: 'rgb(255,0,0)',
  },
  className: `
    sticky
    bg-red-900
`
})``;
