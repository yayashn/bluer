import Bio from './Bio';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Box from '../common/Box';
import Position from '../common/Position';
import { createPost, deletePost, editPost, likePost, unlikePost } from '../../firebase/post';
import dots from '../../assets/dots';
import { useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase-config';
import heart from '../../assets/heart';
import heartOn from '../../assets/heartOn';
import Suggestions from './Suggestions';

export default (props: {username: string, users: any}) => {
    const [disabled, setDisabled] = useState(true);
    const [big, setBig] = useState(window.innerWidth >= 640);
    const inputRef:React.MutableRefObject<any> = useRef(null);
    const [edit, setEdit]: [number | null, Dispatch<SetStateAction<any>>] = useState(null);
    const editRefs:React.MutableRefObject<any> = useRef([]);
    let { userPage } = useParams<string>();
    userPage = userPage?.toLowerCase();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const on = onValue(ref(db, `/posts/${userPage}`), snapshot => {
            const data = snapshot.val();
            setPosts(data);
        });
        return () => {
            on();
        }
      }, [userPage])

    window.addEventListener('resize', () => {
        setBig(window.innerWidth >= 640);
    })

    return (
        <Position position='center'>
            <Container>
                <div className='flex'>
                    <div className='flex flex-col mr-0 sm:mr-5 w-full'>
                        {!big && <Bio posts={posts} username={props.username} users={props.users} user={props.users[userPage!]} className='mb-5'/>}
                        {props.username == userPage && <Box className='p-5 pb-2 mb-5'>
                            <textarea ref={el => inputRef.current = el} onChange={(e)=>{e.currentTarget.value.trim() === '' ? setDisabled(true) : setDisabled(false)}}className="bg-transparent resize-none" placeholder="What's up?"></textarea>
                            <div className='flex justify-end w-full'>
                                <button 
                                onClick={()=>{
                                    try {
                                        setTimeout(() => {
                                            createPost(props.users[userPage!.toLowerCase()].username, inputRef.current.value);
                                            inputRef.current.value = '';
                                            inputRef.current.blur();
                                            setDisabled(true);
                                        }, 100);
                                    } catch(error) {console.log(error)}
                                }}
                                className={`btn btn-sm mt-2 w-36 ${disabled ? 'btn-disabled' : 'btn-primary'}`}>Post</button>
                            </div>
                        </Box>}
                        <div className='flex flex-col-reverse posts'>
                            {posts && Object.entries(posts).map(([k, p]: any, i: number) => {
                                return (
                                    <Box key={i} className='p-5 pb-0 mb-5 relative'>
                                        <div className="flex mb-4">
                                            <div className={`avatar relative mr-3`}>
                                                <div className="mask mask-squircle bg-base-content w-10 aspect-square bg-opacity-10">
                                                    <img src={props.users[userPage!].avatar} className="mask mask-squircle" />
                                                </div>
                                            </div>
                                            <Position className='flex-col'>
                                                <span className='text-xl font-bold'>{props.users[userPage!].name !== '' ? props.users[userPage!].name : userPage}</span>
                                                <span className='text-sm'>@{userPage}</span>
                                            </Position>
                                        </div>
                                        {edit == i 
                                            ? <div className='flex flex-col'>
                                                <textarea ref={el => editRefs.current[i] = el} className='bg-primary rounded-sm text-black placeholder-black resize-none' defaultValue={p.text} placeholder={p.text}></textarea>
                                                <div className='flex w-full justify-end mt-3'>
                                                    <button onClick={setEdit} className='btn btn-sm btn-primary mr-2'>Cancel</button>
                                                    <button onClick={e=>{
                                                        setTimeout(() => {
                                                            editPost(props.username, editRefs.current[i].value, k);
                                                            setEdit(null);
                                                        }, 100);
                                                    }} className='btn btn-sm btn-accent'>Confirm</button>
                                                </div>
                                              </div>
                                            : <>
                                                <p>{p.text}</p>
                                                <div className='py-3'>
                                                    <button 
                                                    className='flex'
                                                    onClick={()=>{
                                                        if(p.likes && p.likes[props.username]) {
                                                            unlikePost(props.username, userPage!, k)
                                                        } else {
                                                            likePost(props.username, userPage!, k) 
                                                        }
                                                    }}>{(p.likes && p.likes[props.username]) ? heartOn : heart} <span className='ml-2'>{p.likes ? Object.keys(p.likes).length : 0}</span></button>
                                                </div>
                                            </>
                                        }
                                        {props.username == userPage && <div className='absolute right-5 flex justify-between w-15'>
                                            <div className="dropdown dropdown-end">
                                                <label className='cursor-pointer' tabIndex={0}>{dots}</label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-200 rounded-box w-32">
                                                    <li><button onClick={(e)=>{setEdit(i); e.currentTarget!.parentElement!.parentElement!.blur()}}>Edit</button></li>
                                                    <li><button onClick={(e)=>{
                                                        setTimeout(() => {
                                                            deletePost(props.username, k);
                                                        }, 100);
                                                        e.currentTarget!.parentElement!.parentElement!.blur();
                                                        }}>Delete</button></li>
                                                </ul>
                                            </div>
                                        </div>}
                                    </Box>
                                )
                            })}
                        </div>
                    </div>
                    {big && <div className='flex flex-col h-auto md:max-w-xs mb-5 md:mb-0 w-full'>
                        <BioBig posts={posts} username={props.username} users={props.users} user={props.users[userPage!]}/>
                        <Suggestions users={props.users} username={props.username}/>
                    </div>}
                </div>
            </Container>
        </Position>
    )
}

const Container = (props: {children: React.ReactNode}) => {
    return (
        <div className="flex justify-center w-full max-w-5xl">
            <div className="flex flex-col w-11/12">
                {props.children}
            </div>
        </div>
    )
}

const BioBig = styled(Bio)`
    min-width: 300px;
    max-width: 300px;
`