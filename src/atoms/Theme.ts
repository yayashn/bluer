import { atom } from "recoil";

export default atom({
    default: localStorage.getItem('mode') || 'bright',
    key: 'ThemeState'
})