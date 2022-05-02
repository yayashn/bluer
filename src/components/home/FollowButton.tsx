import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil"
import chat from "../../assets/chat";
import RequestChat from "../../atoms/RequestChat";

export default (props: {children: React.ReactNode, extra?: boolean, onClick: ()=>any}) => {
    const [requestChat, setRequestChat] = useRecoilState(RequestChat);
    let { userPage } = useParams();
    userPage = userPage?.toLowerCase();
    
    return (
        <div className="btn-group w-full justify-center my-5">
            <button onClick={props.onClick} className="btn btn-primary btn-sm">{props.children}</button> 
            {props.extra && <button
            onClick={()=>{
                setRequestChat(userPage!);
            }}
            aria-label="button component" className="btn btn-primary btn-square btn-sm">
            {chat}
            </button>}
        </div>
    )
}