import Avatar from "../common/Avatar";
import HollowButton from "../common/HollowButton";
import Box from "../common/Box";
import ButtonContainer from "./ButtonContainer";
import { User } from "firebase/auth";
import dots from "../../assets/dots";
import { useRef, useState } from "react";
import { editInfo } from "../../firebase/profile";

export default (props: {className?: string, user: User}) => {
    const [edit, setEdit] = useState(false);
    const bioRef:any = useRef(null);
    const nameRef:any = useRef(null);

    let username = '';
    let name = '';
    if(props.user) {
        username = props.user.username;
        name = props.user.name !== '' ? props.user.name : username;
    }
    return (
        <Box className={props.className + ' bg-transparent'}>
            <div className="bg-base-100 rounded-box">
                <div className="flex p-5 pb-1">
                    <div className='flex items-start -mt-5'>
                        <Avatar className='p-5'/>
                    </div>
                    <div className='flex flex-col'>
                        {edit
                        ? <input className="bg-primary rounded-sm text-black text-xl font-bold w-28" ref={el => nameRef.current = el} defaultValue={name}/>
                        : <span className='text-xl font-bold'>{name}</span>}
                        <span className='text-sm'>@{username}</span>
                    </div>
                </div>
                <ButtonContainer>
                    <HollowButton disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Followers</span></HollowButton>
                    <HollowButton disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Following</span></HollowButton>
                </ButtonContainer>
                {edit 
                    ?   <div className="flex flex-col p-5">
                            <textarea ref={el => bioRef.current = el} className="bg-primary text-black rounded-sm resize-none" defaultValue={props.user && props.user.bio}></textarea>
                            <div className="flex mt-3">
                                <button onClick={()=>setEdit(false)} className='btn btn-sm btn-secondary mr-2'>Cancel</button>
                                <button onClick={e=>{
                                    setTimeout(() => {
                                        editInfo(username, {name: '', bio: bioRef.current.value})
                                        setEdit(false);
                                    }, 100);
                                }} className='btn btn-sm btn-primary'>Confirm</button>
                            </div>
                        </div>
                    :   <p className='p-5'>{props.user && props.user.bio}</p>}
                <div className='absolute right-5 top-5 flex justify-between w-15'>
                    <div className="dropdown dropdown-end">
                        <label className='cursor-pointer' tabIndex={0}>{dots}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-32">
                            <li><button onClick={e => {setEdit(true); e.currentTarget.parentElement!.parentElement!.blur()}}>Edit</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    )
}