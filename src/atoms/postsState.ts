import { atom } from "recoil";
import createIpsum from 'corporate-ipsum';

export default atom({
    key: 'postsState',
    default: [{name: 'First Last', text: createIpsum(), key: 0}]
})