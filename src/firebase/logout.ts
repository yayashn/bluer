import { signOut } from "firebase/auth"
import { auth } from "../firebase-config"

export default async () => {
    await signOut(auth) ;
}