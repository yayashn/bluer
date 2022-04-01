import { atom } from "recoil";
import createIpsum from 'corporate-ipsum';

export default atom({
    key: 'postsState',
    default: {0: {name: 'First Last', text: createIpsum()}}
})