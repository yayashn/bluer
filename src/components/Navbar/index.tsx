import { MutableRefObject, useRef, useState } from "react";
import { Navbar } from "../common/Navbar";
import { Page } from "../common/Page";
import { PageLine } from "../common/PageLine";

const pages:any = {
    "home": "/",
    "profile": "/profile"
}  

export default () => {
    const linkRef:MutableRefObject<any> = useRef([]);
    let currentPage:string | undefined = Object.keys(pages).find(k=>pages[k]===window.location.pathname);
    const [hoveredLink, setHoveredLink] = useState(currentPage);
    return (
        <Navbar>
            <h1 className="text-white text-3xl p-1">sma</h1>
            <div className="flex">
            {Object.keys(pages).map((page: string, i: number) => {
                return (
                <Page
                    key={i}
                    to={pages[page]}
                    layout 
                    onMouseDown={()=>{setHoveredLink(page); currentPage=page}} 
                    onMouseEnter={()=>setHoveredLink(page)}
                    onMouseLeave={()=>setHoveredLink(currentPage)} 
                    ref={el => linkRef.current[page] = el}>
                    {page}
                    {hoveredLink == page && <PageLine/>}
                </Page>
                )
            })}
            </div>
        </Navbar>
    )
}