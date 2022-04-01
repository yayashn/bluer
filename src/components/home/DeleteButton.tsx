import styled from 'styled-components';
import Button  from '../common/Button';

export const DeleteButton: any = styled(Button).attrs({
  whileHover: {
    backgroundColor: 'rgb(255,0,0)',
  },
  className: `
    sticky
    bg-red-900
`
})``;
