import edit from "../../assets/edit";
import { EditInput } from "./EditInput";
import { IconButton } from "../common/IconButton";
import { Post } from "./Post";
import { ProfilePic } from "../common/ProfilePic";
import { ButtonContainer } from "./ButtonContainer";
import NormalButton  from "../common/Button";
import { useState, MutableRefObject, useRef } from "react";
import { useRecoilState } from "recoil";
import postsState from "../../atoms/postsState";
import del from "../../assets/delete";
import alertState from "../../atoms/alertState";

export default () => {
    const [posts, setPosts] = useRecoilState(postsState);
    const [editPost, setEditPost]: any = useState(null);
    const editPostRef:MutableRefObject<any> = useRef(null);
    const [alert, setAlert] = useRecoilState(alertState);
    
    return (
        <>
        {Object.entries(posts).slice(0).reverse().map(([key, post]: any)=> {
            return (
              <Post key={key}>
                <ProfilePic/>
                <div className='flex flex-col flex-grow w-auto'>
                  <span className='font-bold'>{post.name}</span>
                  {editPost == key
                  ? <>
                      <EditInput defaultValue={post.text} ref={(el: any) => editPostRef.current = el}></EditInput>
                      <ButtonContainer>
                          <NormalButton onClick={()=>{setEditPost(null)}}>Cancel</NormalButton>
                          <NormalButton onClick={()=>{
                            const newPosts: any = {...posts};
                            newPosts[key] = {name: post.name, text: editPostRef.current.value};
                            setPosts(newPosts);
                            setEditPost(null);
                          }}>Confirm</NormalButton>
                      </ButtonContainer>
                    </>
                  : <p className='w-11/12'>{post.text}</p>}
                </div>
                <div className='absolute top-0 right-0 flex p-3'>
                  <IconButton onClick={()=>setEditPost(key)}>
                    {edit}
                  </IconButton>
                  <IconButton onClick={()=>{
                    setAlert(key);
                  }}>{del}</IconButton>
                </div>
              </Post>
            )
        })}
        </>
    )
}