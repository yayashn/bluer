import { ref, set } from "firebase/database"
import { db } from "../firebase-config";

export const editInfo = (username: string, info: {name: string, bio: string}) => {
    set(ref(db, `/${username}/bio`), info.bio);
    set(ref(db, `/${username}/name`), info.name);
}