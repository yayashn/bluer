import styled from 'styled-components';
import createIpsum from 'corporate-ipsum';
import { motion } from 'framer-motion';
import { useState, useRef, MutableRefObject, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './tailwind.css';
import del from './assets/delete';
import edit from './assets/edit';

const pages:any = {
  "home": "/",
  "profile": "/profile"
}

const placeholderText:any = [];
for (let i = 0; i < 10; i++) {
  placeholderText.push(createIpsum(2));
}

export default () => {
  const linkRef:MutableRefObject<any> = useRef([]);
  let currentPage:string | undefined = Object.keys(pages).find(k=>pages[k]===window.location.pathname);
  const [hoveredLink, setHoveredLink] = useState(currentPage);
  const [posts, setPosts] = useState([{name: 'First Last', text: createIpsum(), key: 0}]);
  const inputRef:MutableRefObject<any> = useRef(null);
  const [alert, setAlert]: any = useState(null);
  const [editPost, setEditPost]: any = useState(null);
  const editPostRef:MutableRefObject<any> = useRef(null);

  useEffect(() => {
    setAlert(null);
  }, [posts])

  return (
    <Router>
      <Navbar>
        <h1 className="text-white text-3xl p-1">sma</h1>
        <div className="flex">
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
        </div>
      </Navbar>
      {alert !== null && <Blackout>
          <Alert>
            <div className='mb-5'>Are you sure you want to delete this post?</div>
            <div className="flex justify-between w-full">
              <NormalButton
                onTap={()=>setAlert(null)}
              >Cancel</NormalButton>
              <DeleteButton onTap={()=>setPosts(posts.filter(p => p.key !== alert))}>
                Delete
              </DeleteButton>
            </div>
          </Alert>
        </Blackout>}
      <Routes>
        <Route path='/' element={
          <Container>
            <div className='flex flex-col flex-grow'>
              <Post>
                <ProfilePic/>
                <PostInput ref={el => inputRef.current = el}/>
                <Button onClick={()=>{
                  setPosts([{name: 'User Name', text: inputRef.current.value, key: posts.length}, ...posts]);
                  inputRef.current.value = inputRef.current.defaultValue;
                }}>Post</Button>
              </Post>
              {posts.map((post, i)=> {
                return (
                  <Post key={i}>
                    <ProfilePic/>
                    <div className='flex flex-col flex-grow w-auto'>
                      <span className='font-bold'>{post.name}</span>
                      {editPost == post.key
                      ? <>
                          <EditInput defaultValue={post.text} ref={(el: any) => editPostRef.current = el}></EditInput>
                          <ButtonContainer>
                              <NormalButton onClick={()=>{setEditPost(null)}}>Cancel</NormalButton>
                              <NormalButton onClick={()=>{
                                post.text = editPostRef.current.value;
                                setEditPost(null);
                              }}>Confirm</NormalButton>
                          </ButtonContainer>
                        </>
                      : <p className='w-11/12'>{post.text}</p>}
                    </div>
                    <div className='absolute top-0 right-0 flex p-3'>
                      <IconButton onClick={()=>setEditPost(post.key)}>
                        {edit}
                      </IconButton>
                      <IconButton onClick={()=>{
                        setAlert(post.key);
                      }}>{del}</IconButton>
                    </div>
                  </Post>
                )
              })}
            </div>
            <div className='flex flex-col'>
              <Bio></Bio>
            </div>
          </Container>
        }/>
        <Route path='/profile' element={<>profile</>}/>
      </Routes>
    </Router>
  )
}

const Container = styled.div.attrs({className: `
  flex
  relative
  justify-between
  mr-10
  -translate-x-2/4
  left-2/4
`})`
  max-width: 900px;
`

const Navbar: any = styled(Container).attrs({className: `
  rounded-xl
  bg-slate-900
  px-5
  my-5
  -translate-x-2/4
  left-2/4
`})`max-width: 900px;`


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

const Post = styled.div.attrs({className: `
  relative
  flex
  rounded-xl
  bg-slate-900
  max-w-xl
  p-2
  pb-4
  mb-5
`})`width: 96%;`

const PostInput = styled.textarea.attrs({
  placeholder: "What's up?",
  className: `
    bg-transparent
    resize-none
    w-8/12
    h-full
    mt-2
`})`
  min-height: 96px;
  outline: none;
`

const EditInput: any = styled(PostInput).attrs({
  placeholder: "",
  className: `
  mt-0
  mb-5
`})`
  width: 92%;
`

const Button = styled(motion.button).attrs({
  transition: {
    duration: 0.2
  },
  whileHover: {
    backgroundColor: 'rgb(46, 86, 203)',
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


const NormalButton = styled(motion.button).attrs({
  transition: {
    duration: 0.2
  },
  whileHover: {
    backgroundColor: 'rgb(46, 86, 203)',
  },

  className:`
    bottom-3
    right-3
    bg-blue-900
    px-5 
    py-1
    rounded-lg
    drop-shadow-md
`})``

const DeleteButton: any = styled(NormalButton).attrs({
  whileHover: {
    backgroundColor: 'rgb(255,0,0)',
  },
  className:`
    sticky
    bg-red-900
`})``


const Bio = styled.div.attrs({className: `
  relative
  flex
  rounded-xl
  bg-slate-900
  p-40
  px-35
`})``

const Alert = styled.div.attrs({className: `
  flex
  flex-col 
  justify-center 
  content-center 
  bg-slate-900 
  w-80 
  h-40
  p-10
  pt-12
  rounded-xl
`})``

const Blackout = styled.div.attrs({className: `
  fixed
  flex
  justify-center
  items-center
  top-0
  left-0
  w-screen
  h-screen
  z-10
`})`background-color: rgba(0,0,0,0.7);`

const ProfilePic = styled.div.attrs({className: `
  rounded-full
  h-12
  mt-1
  mx-3 
  aspect-square 
  bg-white
`})``

const IconButton = styled(motion.button).attrs({
  whileHover: {
    transform: "translateY(-3px)"
  }
})``

const ButtonContainer = styled.div.attrs({className:`
  absolute
  flex
  justify-end
  w-full
  bottom-3
  right-3
`})`
  & > button {
    margin-left: 1rem;
  }
`