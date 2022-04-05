import { ref, set } from "firebase/database"
import { db } from "../firebase-config";

export const createPost = (username: string, text: string) => {
    set(ref(db, `/posts/${username}/${new Date().toString()}`), text);
}