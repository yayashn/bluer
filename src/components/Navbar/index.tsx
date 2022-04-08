import { Link, Navigate, useNavigate } from "react-router-dom";
import Position from "../common/Position";
import logout from "../../firebase/logout";
import { useRef, useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/search";
import { motion } from "framer-motion";


export default (props: {users: any, user: any, setUser: any}) => {
    const [search, setSearch] = useState('');
    const searchRef:any = useRef(null);
    const nav = useNavigate();
    let limit = 5;

    return (
        <Position position="center" className="relative z-50">
            <div className="flex justify-center my-5 w-full max-w-5xl">
                <div className="navbar w-11/12 bg-base-100 shadow-xl rounded-box">
                    <div className="flex-1"><Link to='/' className="btn btn-ghost normal-case text-xl">bluer</Link></div>
                        <div className="form-control relative mx-3">
                            <input ref={el => searchRef.current = el} tabIndex={0} onChange={e => setSearch(e.currentTarget.value)} type="text" placeholder="Search for people" className={`${search !== '' && 'border-primary'} input input-sm h-full focus:outline-none focus:border-primary input-bordered`}/>
                            <Search/>
                            {search !== '' && <ul tabIndex={0} className="absolute top-10 w-full h-auto bg-base-300 rounded-md">
                                {Object.values(props.users).map((u:any)=>{
                                    if(u.username && limit > 0 && u.username.includes(search)) {
                                        limit--;
                                        return (
                                            <li
                                                onMouseDown={()=>{nav(`users/${u.username}`); setSearch(''); searchRef.current.value = ''}}
                                                className="capitalize text-sm px-2 p-1 w-full hover:text-primary hover:underline cursor-pointer">{u.username}</li>
                                        )
                                    }
                                })}
                            </ul>}
                        </div>
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                                <div className="w-10 bg-secondary border-primary rounded-full">
                                    <span className="text-3xl">{props.user.email.split('')[0]}</span>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32">
                                <li><Link to={`users/${props.user.email.split('@')[0]}`} onClick={async ()=>{await logout(); props.setUser(null); nav('/')}}>Log out</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Position>
    )
}

const Search = styled(motion.button).attrs({
    whileTap: {scale: 0.8},
    className: `
        absolute
        aspect-ratio
        right-1
        h-full
        flex
        items-center
        justify-center
        cursor-pointer
    `
})``