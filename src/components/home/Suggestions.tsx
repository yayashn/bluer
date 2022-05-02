import { useState } from "react";
import { Link } from "react-router-dom";
import { unfollow, follow } from "../../firebase/profile";

export default (props: {users: any, username: any}) => {
    const [suggestions, setSuggestions] = useState(shuffle(Object.entries(props.users)))
    let max = 3;
    const user = props.users[props.username];
    return (
        <div className="c w-full bg-base-100 rounded-box p-5 mt-5">
            <h2 className="text-xl font-bold">Suggestions</h2>
            <hr className="my-5"/>
            <div className="empty">
                {suggestions.map(([name, info]) => {
                    if(max == 0 || name == props.username || (user.following && user.following[name])) return;
                    max--;
                    return <div className="flex flex-row items-center w-full justify-between py-2">
                        <Link to={`/users/${name}`} className="flex flex-col">
                            <span className="text-sm font-bold">{info.name != '' ? info.name : name}</span>
                            <span className="text-xs">@{name}</span>
                        </Link>
                        <button 
                        onClick={()=>{
                            if(user.following && user.following[name]){
                                unfollow(props.username, name)
                            } else {
                                follow(props.username, name);
                            }
                        }}
                        className="btn btn-primary btn-xs">{user.following && user.following[name] ? 'Unfollow' : 'Follow'}</button>
                    </div>
                })}
            </div>
        </div>
    )
}

const shuffle = (array: any) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}