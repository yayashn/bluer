import { useEffect, useRef, useState } from "react";
import { editInfo, follow, unfollow } from "../../firebase/profile";
import { useParams } from "react-router-dom";
import FollowButton from "./FollowButton";
import { set, ref } from "firebase/database";
import { db, storage } from "../../firebase-config";
import styled from "styled-components";
import upload from "../../assets/upload"; 
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from "firebase/storage";

export default (props: {className?: string, posts: any, username: string, users: any, user: {username: string, name: string, bio: string, following: any, followers: any}}) => {
    const [edit, setEdit] = useState(false);
    let { userPage } = useParams();
    userPage = userPage?.toLowerCase();
    const nameRef:any = useRef();
    const bioRef:any = useRef();
    const user = props.users[userPage!];
    if(!user) {return <>User not found.</>}
    const followers = user.followers && Object.keys(user.followers).length || 0;
    const following = user.following && Object.keys(user.following).length || 0;
    const postCount = props.posts ? Object.keys(props.posts).length : 0;
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [userPage])

    return (
        <>
            <div className="relative flex flex-col h-auto rounded-box bg-transparent md:max-w-xs mb-5 sm:mb-0 w-full">
                <div className="bg-base-100 rounded-box">
                    <div className="flex justify-center my-5">
                        <div className={`avatar relative ${(props.username == userPage || user['last-seen'] > new Date().getTime() - 10000) && 'online'}`}>
                            <div className="mask mask-squircle bg-base-content w-20 aspect-square bg-opacity-10 p-px"><img src={loading ? '' : props.users[userPage!].avatar} className="mask mask-squircle" /></div>
                            {edit && 
                            <label
                            className="absolute w-full h-full flex justify-center items-center cursor-pointer">
                                {progress > 0 ? <span>{progress}%</span> : upload}
                                <input
                                    type="file"
                                    onChange={(e: any)=>{
                                        const image = e.target.files[0];
                                        const imageRef = storageRef(storage, `avatars/${image.name}`);
                                        const uploadTask = uploadBytesResumable(imageRef, image);
                                
                                        uploadTask.on("state_changed", (snapshot) => {
                                            setProgress(Math.round(
                                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                            ))
                                        },
                                        (err) => console.log(err),
                                        async () => {
                                            try {
                                                const url = await getDownloadURL(uploadTask.snapshot.ref);
                                                set(ref(db, `users/${props.username}/avatar`), url);
                                                setProgress(0);
                                            } catch {
                                                set(ref(db, `users/${props.username}/avatar`), '');
                                            }
                                        })
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
                            <input ref={el => nameRef.current = el} className="text-lg text-center font-extrabold h-7 capitalize w-32 bg-primary rounded-sm text-black" defaultValue={user.name !== '' ? user.name : user.username}/>
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
                                        editInfo(props.username, {name: nameRef.current!.value, bio: bioRef.current!.value});
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