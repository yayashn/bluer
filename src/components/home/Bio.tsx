import Avatar from "../common/Avatar";
import HollowButton from "../common/HollowButton";
import Box from "../common/Box";
import ButtonContainer from "./ButtonContainer";
import { User } from "firebase/auth";

export default (props: {className?: string, user: User}) => {
    let username = '';
    let name = '';
    if(props.user) {
        username = props.user.username;
        name = props.user.name !== '' ? props.user.name : username;
    }
    return (
        <Box className={props.className + ' bg-transparent'}>
            <div className="bg-base-100 rounded-box">
                <div className="flex p-5 pb-1">
                    <div className='flex items-start -mt-5'>
                        <Avatar className='p-5'/>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold'>{name}</span>
                        <span className='text-sm'>@{username}</span>
                    </div>
                </div>
                <ButtonContainer>
                    <HollowButton disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Followers</span></HollowButton>
                    <HollowButton disabled={true}><span className='font-bold'>0</span> <span className="whitespace-pre"> Following</span></HollowButton>
                </ButtonContainer>
                <p className='p-5'>Hello, I just joined bluer!</p>
            </div>
        </Box>
    )
}