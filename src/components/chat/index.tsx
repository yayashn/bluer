import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import chat from "../../assets/chat";
import exit from "../../assets/exit";
import RequestChat from "../../atoms/RequestChat";
import Theme from "../../atoms/Theme";
import { sendChat } from "../../firebase/chat";

export default (props: {username: any, users: any}) => {
    const [toggle, setToggle] = useState(false);
    const [recipent, setRecipent]:any = useState(null);
    const inputRef:React.MutableRefObject<any> = useRef(null);
    const [request, setRequest]: any = useRecoilState(RequestChat);
    const chatters = props.users && props.users[props.username] &&
                    props.users[props.username].chats && 
                    Object.keys(props.users[props.username].chats);
    const [searchChatters, setSearchChatters] = useState('');
    const [mode, setMode] = useRecoilState(Theme);
    
    useEffect(() => {
        if(request && chatters && !chatters.find((e: string) => e == request)){
            chatters.push(request);
        } 
        if(request) {
            setToggle(true);
            setRecipent(request);
        }
    }, [request])

    return (
        <div className="fixed right-0 bottom-0 z-50">
            <div className="flex flex-col justify-end w-72">
                <div className="flex relative transition-all duration-300 hover:bg-primary-focus text-black bg-primary mr-1 w-full h-9 p-2 rounded-btn rounded-bl-none rounded-br-none">
                    <button className={`absolute top-0 left-0 ${(toggle && recipent) ? 'w-10/12' : 'w-full'} h-full`} onClick={()=>setToggle(!toggle)}></button>
                    {chat} 
                    <span className="ml-1">Chat</span>
                    {toggle && recipent && <button onClick={()=>setRecipent(null)} className="absolute right-2">{exit}</button>}
                </div>
                <AnimatePresence>
                {toggle &&
                    <motion.div 
                        className="flex flex-col items-center w-full bg-base-100"
                        initial={{height: 0}}
                        exit={{height: 0}}
                        animate={{height: "24rem"}}>
                        {!recipent 
                            ?<>
                                {!chatters && <div className="alert alert-warning alert-sm  w-11/12 mt-3">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        <span className="text-xs">You have no previous chats, search for a profile and start a chat!</span>
                                    </div>
                                </div>}
                                {chatters && 
                                <>
                                    <input 
                                    type="text" 
                                    placeholder="Search for chats" 
                                    onChange={e => setSearchChatters(e.currentTarget.value)}
                                    className="input input-sm input-bordered focus:border-primary w-11/12 mt-3 focus:outline-none hover:outline-none"/>
                                    <div className="overflow-y-scroll w-full">
                                        {chatters.map((u:any) => {
                                            if(!u.toLowerCase().includes(searchChatters.toLowerCase())) return;
                                            return (
                                                <button onClick={()=>setRecipent(u)} className="flex flex-row items-center w-full p-3 hover:bg-base-200 hover:text-primary">
                                                    <div className={`avatar relative ${
                                                        (props.users[u]['last-seen'] > new Date().getTime() - 10000) && 'online'}`
                                                    }>
                                                        <div className="mask mask-squircle bg-base-content w-10 aspect-square bg-opacity-10 p-px"><img src={props.users[u].avatar || ''}/></div>
                                                    </div>
                                                    <div className="ml-3">{u}</div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </>}
                            </>
                            :<>
                                <div className={`flex flex-col-reverse w-full h-5/6 ml-10 items-start overflow-y-scroll`}>
                                    {
                                    props.users[props.username].chats && props.users[props.username].chats[recipent] &&
                                    [...Object.entries(props.users[props.username].chats[recipent])]
                                    .sort((a: any, z: any) => {
                                        return Number(z[0].split(':')[1])-Number(a[0].split(':')[1])})
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
                                    if(inputRef.current.value !== '' && e.key === 'Enter') {
                                        sendChat(props.username, recipent, inputRef.current.value);
                                        inputRef.current.value = '';
                                    }
                                }}
                                type="text" placeholder="Type here" className="input input-sm input-bordered w-11/12 translate-y-4 focus:border-primary focus:outline-none hover:outline-none max-w-xs"/>
                            </>
                        }
                    </motion.div>
                }
                </AnimatePresence>
            </div>
        </div>
    )
}

interface Bubble {
    sender: boolean;
}
const Bubble = styled.p.attrs<Bubble>(props => ({
    className: `
    flex
    flex-row
    flex-end
    rounded-xl
    w-3/4
    p-3
    py-2
    my-1
    relative
    text-black
    ${props.sender ? `
        bg-primary
    `:`
        bg-accent
    `}
    
`}))<Bubble>`
    ${props => props.sender 
    ? 'margin-left: 30px !important;'
    : `margin-left: 15px !important;
    `}
`