import { ref, set } from "firebase/database";
import { db } from "../firebase-config";

export const sendChat = (username: string, recipent: string, text: string) => {
    username = username.toLowerCase();
    recipent = recipent.toLowerCase();
    const time = new Date().getTime();
    set(ref(db, `users/${username}/chats/${recipent}/${username}:` + time), text);
    set(ref(db, `users/${recipent}/chats/${username}/${username}:` + time), text);
}