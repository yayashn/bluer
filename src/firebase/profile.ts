import { ref, remove, set } from "firebase/database"
import { db, storage } from "../firebase-config";
import { getDownloadURL, ref as storageRef, uploadBytes, uploadBytesResumable} from "firebase/storage";

export const editInfo = (username: string, info: {name: string, bio: string}) => {
    username = username.toLowerCase();
    set(ref(db, `users/${username}/bio`), info.bio);
    set(ref(db, `users/${username}/name`), info.name);
}
export const follow = (username: string, user: string) => {
    username = username.toLowerCase();
    user = user.toLowerCase();
    set(ref(db, `users/${username}/following/${user}`), user);
    set(ref(db, `users/${user}/followers/${username}`), username);
}

export const unfollow = (username: string, user: string) => {
    username = username.toLowerCase();
    user = user.toLowerCase();
    remove(ref(db, `users/${username}/following/${user}`));
    remove(ref(db, `users/${user}/followers/${username}`));
}

export const rmFollow = (username: string, user: string) => {
    username = username.toLowerCase();
    user = user.toLowerCase();
    remove(ref(db, `users/${username}/followers/${user}`));
    remove(ref(db, `users/${user}/following/${username}`));
}