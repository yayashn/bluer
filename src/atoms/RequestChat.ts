import { atom } from "recoil";

export default atom<string | null>({
    key: "RequestChatState",
    default: null
})