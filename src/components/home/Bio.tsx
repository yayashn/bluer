import { useRef, useState } from "react";
import { editInfo, follow, rmFollow, unfollow } from "../../firebase/profile";
import { useParams } from "react-router-dom";
import FollowButton from "./FollowButton";
import { set, ref } from "firebase/database";
import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import { db, storage } from "../../firebase-config";
import styled from "styled-components";
import upload from "../../assets/upload";

export default (props: {className?: string, posts: any, username: string, users: any, user: {username: string, name: string, bio: string, following: any, followers: any}}) => {
    const [edit, setEdit] = useState(false);
    const { userPage } = useParams();
    const nameRef:any = useRef();
    const bioRef:any = useRef();
    const user = props.users[userPage!];
    if(!user) {return <></>}
    const followers = user.followers && Object.keys(user.followers).length || 0;
    const following = user.following && Object.keys(user.following).length || 0;
    const postCount = props.posts ? Object.keys(props.posts).length : 0;
    const [image, setImage] = useState(null);
    const [pic, setPic]:[string | null, any] = useState(null);

    return (
        <>
            <div className="relative flex flex-col h-auto rounded-box bg-transparent md:max-w-xs mb-5 md:mb-0 w-full">
                <div className="bg-base-100 rounded-box shadow-md">
                    <div className="flex justify-center my-5">
                        <div className={`avatar relative ${(props.username == userPage || user['last-seen'] > new Date().getTime() - 10000) && 'online'}`}>
                            <div className="mask mask-squircle bg-base-content w-20 aspect-square bg-opacity-10 p-px"><img src={pic || ''} className="mask mask-squircle" /></div>
                            {edit && 
                            <label className="absolute w-full h-full flex justify-center items-center cursor-pointer">
                                {upload}
                                <input
                                    type="file"
                                    onChange={(e: any)=>{
                                        if(e.target.files[0]) {
                                            setImage(e.target.files[0]);
                                        }
                                    }}
                                    className="hidden"/>
                            </label>
                            }
                        </div>
                    </div>
                    {!edit ? 
                        <>
                            <div className="text-lg text-center font-extrabold h-7 capitalize relative">
                                {user.name !== '' ? user.name : user.username}
                            </div>
                            <div className="text-xs text-center">@{userPage}</div>
                            <div className="text-sm text-center my-3">{user.bio}</div>   
                            <div className="flex w-full justify-center">
                                <div className="flex justify-between w-3/4 text-xs">
                                    <Stats>{postCount} Post{postCount != 1 && 's'}</Stats>
                                    <Stats>{followers} Follower{followers != 1 && 's'}</Stats>
                                    <Stats>{following} Following</Stats>
                                </div>  
                            </div>
                            {props.username !== userPage
                            ? <FollowButton extra onClick={()=>setTimeout(() => {
                                if(user.followers && user.followers[props.username]){
                                    unfollow(props.username, userPage!)
                                } else {
                                    follow(props.username, userPage!);
                                }
                            }, 100)}>{user.followers && user.followers[props.username] ? 'Unfollow' : 'Follow'}</FollowButton>
                            : <FollowButton onClick={()=>setEdit(true)}>Edit Profile</FollowButton>}
                        </>
                        :
                        <div className="flex flex-col justify-center items-center">
                            <input ref={el => nameRef.current = el} className="text-lg text-center font-extrabold h-7 capitalize bg-transparent w-28 bg-primary rounded-sm text-black" defaultValue={user.name !== '' ? user.name : user.username}/>
                            <div className="text-xs text-center">@{userPage}</div>
                            <textarea ref={el => bioRef.current = el} className="text-sm text-center my-3 bg-primary text-black resize-none rounded-sm" defaultValue={user.bio}></textarea>  
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
                                        if(image) {
                                            const imageRef = storageRef(storage, `images/${props.user.username}`)
                                            uploadBytes(imageRef, image).then((snapshot) => {
                                                setImage(null);
                                                getDownloadURL(imageRef).then((url: string) => {
                                                    console.log(url);
                                                    setPic(url);
                                                })
                                            });
                                        }
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