import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { createUser } from "./user";

export default async (username: string, password: string) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, username, password);
        createUser(username.toLowerCase());
        return {
            success: 'alert-success',
            message: 'Registered succesfully, you may now login.',
        }
    } catch(error: any) {
        if(error.message.match('email-already')) {
           error.message = 'Username has been taken.'
        } else if(error.message.match('invalid-email')) {
            error.message = "Invalid username."
        } else {
            error.message = "Please enter a valid username & password."
        }
        return {
            success: 'alert-error',
            message: error.message,
        }
    }
}