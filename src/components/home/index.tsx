import { Key, MutableRefObject, ReactChild, ReactFragment, ReactPortal, useRef, useState } from "react";
import edit from "../../assets/edit";
import del from "../../assets/delete";
import { Bio } from "../common/Bio";
import { Button } from "../common/Button";
import { ButtonContainer } from "../common/ButtonContainer";
import { Container } from "../common/Container";
import { EditInput } from "../common/EditInput";
import { IconButton } from "../common/IconButton";
import { NormalButton } from "../common/NormalButton";
import { Post } from "../common/Post";
import { PostInput } from "../common/PostInput";
import { ProfilePic } from "../common/ProfilePic";
import { useRecoilState } from "recoil";
import postsState from "../../atoms/postsState";
import alertState from "../../atoms/alertState";

export default () => {
  const inputRef:MutableRefObject<any> = useRef(null);
  const [editPost, setEditPost]: any = useState(null);
  const editPostRef:MutableRefObject<any> = useRef(null);
  const [posts, setPosts] = useRecoilState(postsState);
  const [alert, setAlert] = useRecoilState(alertState);
  
  return (
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
        {posts.map((post: any, i)=> {
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
  )
}