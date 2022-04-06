import { Link } from "react-router-dom";
import Position from "../common/Position";
import logout from "../../firebase/logout";

export default (props: {user: any, setUser: any}) => {
    return (
        <Position position="center">
            <div className="flex justify-center my-5 w-full max-w-5xl">
                <div className="navbar w-11/12 bg-base-100 shadow-xl rounded-box">
                    <div className="flex-1"><Link to='/' className="btn btn-ghost normal-case text-xl">bluer</Link></div>
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <span className="mr-3 capitalize">{props.user.email.split('@')[0]}</span>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                                <div className="w-10 bg-secondary border-primary rounded-full">
                                    <span className="text-3xl">{props.user.email.split('')[0]}</span>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32">
                                <li><Link to='/' onClick={async ()=>{await logout(); props.setUser(null)}}>Log out</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Position>
    )
}