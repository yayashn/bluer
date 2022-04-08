import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import chat from "../../assets/chat";
import RequestChat from "../../atoms/RequestChat";
import { sendChat } from "../../firebase/chat";

export default (props: {username: any, users: any}) => {
    const [toggle, setToggle] = useState(false);
    const [recipent, setRecipent]:any = useState(null);
    const inputRef:React.MutableRefObject<any> = useRef(null);
    const [request, setRequest]: any = useRecoilState(RequestChat);
    const chatters = props.users && props.users[props.username].chats && 
                    Object.keys(props.users[props.username].chats);
    const [searchChatters, setSearchChatters] = useState('');
    
    useEffect(() => {
        if(request && chatters && !chatters.find((e: string) => e == request)){
            chatters.push(request);
        } 
        if(request) {
            setToggle(true);
            setRecipent(request);
        }
    }, [request])

    useEffect(() => {
        if(!props.users) return;
        if(!props.users[props.username]) return;
        if(!props.users[props.username].chats) return;
        if(!props.users[props.username].chats[recipent]) return;

        const dict = props.users[props.username].chats[recipent];
        const sortedList: any = [];

        Object.entries(dict).map(([k,v]) => {
            
        })
        
    }, [props.users])
    
    return (
        <div className="fixed right-3 bottom-3 z-50">
            {toggle && <div className="bg-base-100 w-60 h-auto p-3 rounded-md drop-shadow-md">
                {!recipent && chatters && <input 
                    type="text" 
                    placeholder="Search chats" 
                    onChange={e => setSearchChatters(e.currentTarget.value)}
                    className="input input-sm input-bordered focus:border-primary focus:outline-none hover:outline-none w-full max-w-xs"/>}
                    {!chatters && !recipent && <div className="alert alert-warning alert-sm shadow-lg">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span className="text-xs">You have no previous chats.</span>
                        </div>
                    </div>}
                <ul className="overflow-y-scroll">
                    {recipent && <li 
                    className="hover:text-primary hover:underline cursor-pointer" 
                    onClick={()=>{setRecipent(null); setRequest(null)}}>Back</li>}
                    {!recipent && chatters && chatters.map((u: string) => {
                        if(!u.includes(searchChatters)) return;
                        return <li 
                        className="py-2 hover:text-primary hover:underline cursor-pointer capitalize" 
                        onClick={()=>setRecipent(u)}>{u}</li>
                    })}    
                </ul>
                <AnimatePresence>
                    {recipent && 
                        <motion.div
                            exit={{height: 0}}
                            initial={{height:0}}
                            animate={{height: "15rem"}}
                            className="w-full h-full flex flex-col overflow-hidden">
                                <div className={`flex flex-col-reverse w-full h-5/6 items-start overflow-scroll`}>
                                    {
                                    props.users[props.username].chats && props.users[props.username].chats[recipent] &&
                                    [...Object.entries(props.users[props.username].chats[recipent])]
                                    .sort((a: any, z: any) => {
                                        return Number(z[0].replace(/\D/g,''))-Number(a[0].replace(/\D/g,''))})
                                    .map(([u,m]: any) => {
                                        return (
                                            <Bubble key={u} sender={u.startsWith(props.username+':')}>
                                                {m}
                                            </Bubble>
                                        )
                                    })}
                                </div>
                                <input 
                                ref={el => inputRef.current = el}
                                onKeyDown={e => {
                                    if(e.key === 'Enter') {
                                        sendChat(props.username, recipent, inputRef.current.value);
                                        inputRef.current.value = '';
                                    }
                                }}
                                type="text" placeholder="Type here" className="input input-sm input-bordered translate-y-2 focus:border-primary focus:outline-none hover:outline-none w-full max-w-xs"/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>}
            <div className="flex justify-end w-full">
                <button onClick={()=>setToggle(!toggle)} className="btn btn-accent m-1">{chat}</button>
            </div>
        </div>
    )
}

interface Bubble {
    sender: boolean;
}
const Bubble = styled.p.attrs({
    className: `
    flex
    flex-row
    flex-end
    rounded-xl
    w-3/4
    bg-blue-600
    p-3
    py-2
    my-1
    relative
`})<Bubble>`
    ${props => props.sender 
    ? 'margin-left: 30px !important;'
    : `margin-left: 15px !important;
       background-color: hsl(var(--af, var(--a)) / var(--tw-bg-opacity));
    `}
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        width: 0;
        height: 0;
        border: 22px solid transparent;
        border-bottom: 0;
        margin-top: -10px;
        ${props => props.sender ? `
            margin-right: -18px;
            border-right: 0;
            border-left-color: rgb(37,99,235);
            right: 0;
        `: `
            margin-left: -18px;
            border-left: 0;
            border-right-color:  hsl(var(--af, var(--a)) / var(--tw-bg-opacity));
            left: 0;
        `}
    }
`