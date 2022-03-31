import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button).attrs({
  transition: {
    duration: 0.2
  },
  whileHover: {
    backgroundColor: 'rgb(46, 86, 203)',
  },
  className: `
    absolute 
    bottom-3
    right-3
    bg-blue-900
    px-5 
    py-1
    rounded-lg
    drop-shadow-md
`
})``;
