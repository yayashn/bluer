import styled from 'styled-components';
import createIpsum from 'corporate-ipsum';
import { motion } from 'framer-motion';
import { useState, useRef, MutableRefObject } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import './tailwind.css';

const pages:any = {
  "home": "/",
  "profile": "/profile"
}

export default () => {
  const linkRef:MutableRefObject<any> = useRef([]);
  let currentPage:string | undefined = Object.keys(pages).find(k=>pages[k]===window.location.pathname);
  const [hoveredLink, setHoveredLink] = useState(currentPage);

  return (
    <Router>
      <Navbar>
        <h1 className="text-white text-3xl p-1">sma</h1>
        <nav className="flex">
          {Object.keys(pages).map((page: string, i: number) => {
            return (
              <Page
                key={i}
                to={pages[page]}
                layout 
                onMouseDown={()=>{setHoveredLink(page); currentPage=page}} 
                onMouseEnter={()=>setHoveredLink(page)}
                onMouseLeave={()=>setHoveredLink(currentPage)} 
                ref={el => linkRef.current[page] = el}>
                  {page}
                  {hoveredLink == page && <PageLine/>}
              </Page>
            )
          })}
        </nav>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <div className='flex justify-center'>
            <div className='flex flex-col'>
              <PostMenu>
                <div className='rounded-full p-6 m-4 bg-white'></div>
                <PostInput/>
                <PostButton>Post</PostButton>
              </PostMenu>
            </div>
            <div className='flex flex-col'>
            </div>
          </div>
        }/>
        <Route path='/profile' element={<>profile</>}/>
      </Routes>
    </Router>
  )
}

const Navbar = styled.nav.attrs({className: `
  flex
  rounded-xl
  bg-slate-900
  relative
  justify-between
  content-center
  px-5
  m-5
`})``

const Page = styled(motion(Link)).attrs({className: `
  py-3
  mx-6
  rounded-xl
  cursor-pointer
  capitalize
`})``

const PageLine = styled(motion.div).attrs({
  layoutId: "underline",
  initial: {
    y: 12
  },
  transition: {
    type: 'spring',
    duration: 0.3
  },
  className:`
    relative
    bg-white
    h-px
    bottom-0
  `})`
  width: calc(100% + 10px);
  right: 3px;
  top: -1px;
`;

const PostMenu = styled.div.attrs({className: `
  relative
  flex
  rounded-xl
  bg-slate-900
  p-2
  pr-40
  pb-10
`})``

const PostInput = styled.textarea.attrs({
  placeholder: "What's up?",
  className: `
    bg-transparent
    resize-none
    my-4
`})`outline: none;`

const PostButton = styled(motion.button).attrs({
  whileHover: {
    scale: 0.9
  },
  whileTap: {
    scale: 0.7,
    transition: {
      duration: 0.05
    }
  },
  className:`
    absolute 
    bottom-3
    right-3
    bg-blue-900
    px-5 
    py-1
    rounded-lg
    drop-shadow-md
`})``