;import { ref, set } from "firebase/database"
import { db, userTemplate } from "../firebase-config";

export const createUser = (username: string) => {
    const user = userTemplate;
    user.username = username.split('@')[0];
    set(ref(db, `/users/${user.username}`), user);
}