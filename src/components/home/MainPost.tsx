import { MutableRefObject, useRef } from "react";
import { useRecoilState } from "recoil";
import postsState from "../../atoms/postsState";
import Button from "./Button";
import { Post } from "../common/Post";
import { PostInput } from "../common/PostInput";
import { ProfilePic } from "../common/ProfilePic";

export default () => {
    const inputRef:MutableRefObject<any> = useRef(null);
    const [posts, setPosts] = useRecoilState(postsState);
    return (
        <Post>
            <ProfilePic/>
            <PostInput ref={el => inputRef.current = el}/>
            <Button onClick={()=>{
                const newPosts: any = {...posts};
                newPosts[Object.keys(posts).length] = {name: 'User Name', text: inputRef.current.value};
                setPosts(newPosts);
                inputRef.current.value = inputRef.current.defaultValue;
            }}>Post</Button>
        </Post>
    )
}