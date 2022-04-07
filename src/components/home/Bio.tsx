import dots from "../../assets/dots";
import { useRef, useState } from "react";
import { editInfo, follow, rmFollow, unfollow } from "../../firebase/profile";
import { useParams } from "react-router-dom";
import FollowButton from "./FollowButton";
import { set, ref } from "firebase/database";
import { db } from "../../firebase-config";
import styled from "styled-components";

export default (props: {className?: string, posts: any, username: string, users: any, user: {username: string, name: string, bio: string, following: any, followers: any}}) => {
    const [edit, setEdit] = useState(false);
    const { userPage } = useParams();
    const nameRef = useRef();
    const bioRef = useRef();
    const followers = props.users[userPage!].followers && Object.keys(props.users[userPage!].followers).length || 0;
    const following = props.users[userPage!].following && Object.keys(props.users[userPage!].following).length || 0;
    const postCount = props.posts ? Object.keys(props.posts).length : 0;
    
    return (
        <>
            <div className="relative flex flex-col h-auto rounded-box bg-transparent md:max-w-xs mb-5 md:mb-0 w-full">
                <div className="bg-base-100 rounded-box shadow-md">
                    <div className="flex justify-center my-5">
                        <div className="online avatar">
                            <div className="mask mask-squircle bg-base-content w-20 aspect-square bg-opacity-10 p-px"><img src="" className="mask mask-squircle" /></div>
                        </div>
                    </div>
                    {!edit ? 
                        <>
                            <div className="text-lg text-center font-extrabold h-7 capitalize">{props.users[userPage!].name !== '' ? props.users[userPage!].name : props.users[userPage!].username}</div>
                            <div className="text-xs text-center">@{userPage}</div>
                            <div className="text-sm text-center my-3">{props.users[userPage!].bio}</div>   
                            <div className="flex w-full justify-center">
                                <div className="flex justify-between w-3/4 text-xs">
                                    <Stats>{postCount} Post{postCount != 1 && 's'}</Stats>
                                    <Stats>{followers} Follower{followers != 1 && 's'}</Stats>
                                    <Stats>{following} Following</Stats>
                                </div>  
                            </div>
                            {props.username !== userPage
                            ? <FollowButton onClick={()=>setTimeout(() => {
                                if(props.users[userPage!].followers){
                                    unfollow(props.username, userPage!)
                                } else {
                                    follow(props.username, userPage!);
                                }
                            }, 100)}>{props.users[userPage!].followers && props.users[userPage!].followers[props.username] ? 'Unfollow' : 'Follow'}</FollowButton>
                            : <FollowButton onClick={()=>setEdit(true)}>Edit Profile</FollowButton>}
                        </>
                        :
                        <div className="flex flex-col justify-center items-center">
                            <input ref={el => nameRef.current = el} className="text-lg text-center font-extrabold h-7 capitalize bg-transparent w-24 bg-primary rounded-sm text-black" defaultValue={props.users[userPage!].name !== '' ? props.users[userPage!].name : props.users[userPage!].username}/>
                            <div className="text-xs text-center">@{userPage}</div>
                            <textarea ref={el => bioRef.current = el} className="text-sm text-center my-3 bg-primary text-black resize-none rounded-sm" defaultValue={props.users[userPage!].bio}></textarea>  
                            <div className="flex w-full justify-center">
                                <div className="flex justify-between w-3/4 text-xs">
                                <Stats>{postCount} Post{postCount != 1 && 's'}</Stats>
                                    <Stats>{followers} Follower{followers != 1 && 's'}</Stats>
                                    <Stats>{following} Following</Stats>
                                </div>  
                            </div> 
                            <div className="flex my-5 justify-between w-48">
                                <button onClick={()=>setEdit(false)} className="btn btn-primary btn-sm">Cancel</button>
                                <button onClick={()=>{
                                    setTimeout(() => {
                                        set(ref(db, `users/${props.username}/name`), nameRef.current!.value);
                                        set(ref(db, `users/${props.username}/bio`), bioRef.current!.value);
                                        setEdit(false);
                                    }, 100);
                                }} className="btn btn-accent btn-sm">Confirm</button>    
                            </div>  
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

const Stats = styled.span`
    width: 80px;
    text-align: center;
`