import { MutableRefObject, useRef } from "react";
import { useRecoilState } from "recoil";
import postsState from "../../atoms/postsState";
import Button from "./Button";
import { Post } from "./Post";
import { PostInput } from "./PostInput";
import { ProfilePic } from "../common/ProfilePic";

export default () => {
    const inputRef:MutableRefObject<any> = useRef(null);
    const [posts, setPosts] = useRecoilState(postsState);

    return (
        <Post>
            <ProfilePic/>
            <PostInput ref={el => inputRef.current = el}/>
            <Button onClick={()=>{
                if(inputRef.current.value.trim() === '') return;
                const newPosts: any = {...posts};
                newPosts[Object.keys(posts).length] = {name: 'User Name', text: inputRef.current.value};
                setPosts(newPosts);
                inputRef.current.value = inputRef.current.defaultValue;
            }}>Post</Button>
        </Post>
    )
}