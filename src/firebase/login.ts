import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default async (username: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(auth, username, password);
        return {
            success: 'alert-success',
            message: 'Logging in.',
        }
    } catch(error: any) {
        return {
            success: 'alert-error',
            message: error.message.replace('Firebase:', ''),
        }
    }
}