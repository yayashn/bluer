import { ref, remove, set, update } from "firebase/database"
import { db } from "../firebase-config";

export const createPost = (username: string, text: string) => {
    set(ref(db, `/posts/${username}/${new Date().toString()}`), text);
}

export const editPost = (username: string, text: string, post: string) => {
    set(ref(db, `/posts/${username}/${post}`), text);
}

export const deletePost = (username: string, post: string) => {
    remove(ref(db, `/posts/${username}/${post}`));
}