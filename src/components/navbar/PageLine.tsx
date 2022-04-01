import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageLine = styled(motion.div).attrs({
  layoutId: "underline",
  initial: {
    y: 12
  },
  transition: {
    type: 'spring',
    duration: 0.3
  },
  className: `
    relative
    bg-white
    h-px
    bottom-0
  `
})`
  width: calc(100% + 10px);
  right: 3px;
  top: -1px;
`;
