import { ref, remove, set } from "firebase/database"
import { db } from "../firebase-config";

export const editInfo = (username: string, info: {name: string, bio: string}) => {
    set(ref(db, `users/${username}/bio`), info.bio);
    set(ref(db, `users/${username}/name`), info.name);
}

export const follow = (username: string, user: string) => {
    set(ref(db, `users/${username}/following/${user}`), user);
    set(ref(db, `users/${user}/followers/${username}`), user);
}

export const unfollow = (username: string, user: string) => {
    remove(ref(db, `users/${username}/following/${user}`));
    remove(ref(db, `users/${user}/followers/${username}`));
}

export const rmFollow = (username: string, user: string) => {
    remove(ref(db, `users/${username}/followers/${user}`));
    remove(ref(db, `users/${user}/following/${username}`));
}