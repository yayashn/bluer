import { ref, remove, set, update } from "firebase/database"
import { db } from "../firebase-config";

export const createPost = (username: string, text: string) => {
    username = username.toLowerCase();
    set(ref(db, `/posts/${username}/${new Date().getTime()}/text`), text);
}

export const editPost = (username: string, text: string, post: string) => {
    username = username.toLowerCase();
    set(ref(db, `/posts/${username}/${post}`), text);
}

export const deletePost = (username: string, post: string) => {
    username = username.toLowerCase();
    remove(ref(db, `/posts/${username}/${post}`));
}

export const likePost = (username: string, poster: string, post: string) => {
    set(ref(db, `/posts/${poster}/${post}/likes/${username}`), username);
}

export const unlikePost = (username: string, poster: string, post: string) => {
    remove(ref(db, `/posts/${poster}/${post}/likes/${username}`));
}
