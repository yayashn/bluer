import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

export const Page = styled(motion(Link)).attrs({
  className: `
  py-3
  mx-6
  rounded-lg
  cursor-pointer
  capitalize
` })``;
