import { useState } from "react"
import Position from "../common/Position"
import Alert from "./Alert"
import Input from "./Input"
import register from "../../firebase/register"
import login from "../../firebase/login"
import { uid } from "uid";
import createIpsum from "corporate-ipsum";
 
export default () => {
    const [alert, setAlert] = useState(['alert-error', '']);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const username:(input: string)=>void = (input: string) => {setUser(input);} ;
    const password:(input: string)=>void = (input: string) => setPass(input);

    return (
        <div className="flex flex-col h-screen justify-center items-center relative -top-10">
            <Alert className="mb-5" type={alert[0]}>{alert[1]}</Alert>
            <div className="bg-base-100 p-5 rounded-box">
                <Position position="center" className="w-full mb-5">
                    <span className="text-3xl">Login</span>
                </Position>
                <Input input={username} title="Username" placeholder="user123" type="text"/>
                <Input input={password} title="Password" placeholder="" type="password"/>
                <Position position="center" className="">
                    <button onClick={async () => {
                        const response = await register(user, pass);
                        setAlert([response.success, response.message]);
                    }} className="btn btn-accent w-4/12">Sign Up</button>
                    <div className="mx-2"></div>
                    <button onClick={async() => {
                        const response = await login(user, pass);
                        setAlert([response.success, response.message]);
                    }} className="btn btn-primary w-4/12">Login</button>
                </Position>
            </div>
        </div>
    )
}