import Avatar from "../common/Avatar";
import HollowButton from "../common/HollowButton";
import Box from "../common/Box";
import ButtonContainer from "./ButtonContainer";
import { User } from "firebase/auth";
import dots from "../../assets/dots";
import { useEffect, useRef, useState } from "react";
import { editInfo, follow, rmFollow, unfollow } from "../../firebase/profile";

export default (props: {className?: string, user: {username: string, name: string, bio: string, following: any, followers: any}}) => {
    const [edit, setEdit] = useState(false);
    const bioRef:any = useRef(null);
    const nameRef:any = useRef(null);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [followList, setFollowList]:['following' | 'followers' | null, any] = useState(null);

   useEffect(() => {
     try {
        setUsername(props.user.username);
        setName(props.user.name !== '' ? props.user.name : props.user.username);
     } catch{}
   }, [props.user, edit])
   
    return (
        <Box className={props.className + ' bg-transparent shadow-none'}>
            <div className="bg-base-100 rounded-box shadow-md">
                <div className="flex p-5 pb-1">
                    <div className='flex items-start -mt-5'>
                        <Avatar username={username} className='p-5'/>
                    </div>
                    <div className='flex flex-col'>
                        {edit
                        ? <input className="bg-primary rounded-sm text-black text-xl font-bold w-28" ref={el => nameRef.current = el} defaultValue={name}/>
                        : <span className='text-xl font-bold'>{name}</span>}
                        <span className='text-sm'>@{username}</span>
                    </div>
                </div>
                <ButtonContainer>
                    <HollowButton onClick={()=>setFollowList('followers')} disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Followers</span></HollowButton>
                    <HollowButton onClick={()=>setFollowList('following')} disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Following</span></HollowButton>
                </ButtonContainer>
                {followList &&
                <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-40">
                    <div className="absolute w-full h-full bg-black opacity-50 z-10"></div>
                    <div className="bg-base-100 z-20 p-5 rounded-box h-96 w-72">
                        <h1 className="text-2xl capitalize text-center font-bold">{followList}</h1>
                        <ul className="list">
                            {followList && props.user[followList] && Object.values(props.user[followList]).map((f: any) => {
                                return (
                                    <div className="flex justify-between">
                                        <span>{f}</span>
                                        <div>
                                            <button onClick={() => setTimeout(() => {
                                                followList == 'following' 
                                                ?   unfollow(username, f)
                                                :   rmFollow(username, f)
                                            }, 100)
                                            }>-</button>
                                            <button onClick={() => follow(username, f)}>+</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>}
                {edit 
                    ?   <div className="flex flex-col p-5">
                            <textarea ref={el => bioRef.current = el} className="bg-primary text-black rounded-sm resize-none" defaultValue={props.user && props.user.bio}></textarea>
                            <div className="flex mt-3">
                                <button onClick={()=>setEdit(false)} className='btn btn-sm btn-secondary mr-2'>Cancel</button>
                                <button onClick={e=>{
                                    setTimeout(() => {
                                        editInfo(username, {name: nameRef.current.value, bio: bioRef.current.value});
                                        setEdit(false);
                                    }, 100);
                                }} className='btn btn-sm btn-primary'>Confirm</button>
                            </div>
                        </div>
                    :   <p className='p-5'>{props.user && props.user.bio}</p>}
                <div className='absolute right-5 top-5 flex justify-between w-15'>
                    <div className="dropdown dropdown-end">
                        <label className='cursor-pointer' tabIndex={0}>{dots}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-32 bg-base-200">
                            <li><button onClick={e => {setEdit(true); e.currentTarget.parentElement!.parentElement!.blur()}}>Edit</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    )
}