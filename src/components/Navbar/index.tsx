import { Link, Navigate, useNavigate } from "react-router-dom";
import Position from "../common/Position";
import logout from "../../firebase/logout";
import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/search";
import { motion } from "framer-motion";


export default (props: {user: any, setUser: any}) => {
    const [search, setSearch] = useState('');
    const nav = useNavigate();

    return (
        <Position position="center">
            <div className="flex justify-center my-5 w-full max-w-5xl">
                <div className="navbar w-11/12 bg-base-100 shadow-xl rounded-box">
                    <div className="flex-1"><Link to='/' className="btn btn-ghost normal-case text-xl">bluer</Link></div>
                    <div className="form-control relative">
                        <input onChange={e => setSearch(e.currentTarget.value)} type="text" placeholder="Search for people" className="input input-sm h-full focus:outline-none focus:border-primary mx-3 input-bordered"/>
                        <Search>{searchIcon}</Search>
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
        right-4
        h-full
        flex
        items-center
        justify-center
        cursor-pointer
    `
})`
    & > svg {
        height: 15px;
    }
`