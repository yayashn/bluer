import Bio from './Bio';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import  Box  from '../common/Box';
import Avatar from '../common/Avatar';
import Position from '../common/Position';
import { createPost } from '../../firebase/post';

export default (props: {user: any, posts: any}) => {
    const [disabled, setDisabled] = useState(true);
    const [big, setBig] = useState(window.innerWidth >= 640);
    const inputRef:React.MutableRefObject<any> = useRef(null);

    let username = '';
    let name = '';
    if(props.user) {
        username = props.user.username;
        name = props.user.name !== '' ? props.user.name : username;
    }


    window.addEventListener('resize', () => {
        setBig(window.innerWidth >= 640);
    })

    return (
        <Position position='center'>
            <Container>
                <div className='flex'>
                    <div className='flex flex-col mr-0 sm:mr-5 w-full'>
                        {!big && <Bio user={props.user} className='mb-5'/>}
                        <Box className='p-5 pb-2'>
                            <textarea ref={el => inputRef.current = el} onChange={(e)=>{e.currentTarget.value.trim() === '' ? setDisabled(true) : setDisabled(false)}}className="bg-transparent resize-none" placeholder="What's up?"></textarea>
                            <div className='flex justify-end w-full'>
                                <button 
                                onClick={()=>{
                                    try {
                                        setTimeout(() => {
                                            createPost(props.user.username, inputRef.current.value);
                                        }, 500);
                                    } catch(error) {console.log(error)}
                                }}
                                className={`btn btn-sm mt-2 w-36 ${disabled ? 'btn-disabled' : 'btn-primary'}`}>Post</button>
                            </div>
                        </Box>
                        <div className='flex flex-col-reverse'>
                            {props.posts && Object.values(props.posts).map((p: any, i: number) => {
                                return (
                                    <Box key={i} className='p-5 pb-4 mt-5'>
                                        <div className="flex mb-4">
                                            <Avatar className='p-1 mr-2'/>
                                            <Position className='flex-col'>
                                                <span className='text-xl font-bold'>{name}</span>
                                                <span className='text-sm'>@{username}</span>
                                            </Position>
                                        </div>
                                        <p>{p}</p>
                                    </Box>
                                )
                            })}
                        </div>
                    </div>
                    {big && <BioBig user={props.user}/>}
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