import { Bio } from "./Bio";
import { Container } from "../common/Container";
import MainPost from "./MainPost";
import Posts from "./Posts";
import { ProfilePic } from "../common/ProfilePic";
import createIpsum from 'corporate-ipsum';
import styled from "styled-components";

export default () => {
  return (
    <Home>
      <div className='flex flex-col lg:mr-5 items-center'>
        <MainPost/>
        <Posts/>
      </div>
      <div className="flex w-full justify-center">
        <Bio>
          <Profile>
            <ProfilePic/>
            <div className="flex flex-col p-1">
              <span className="text-white">User Name</span>
              <span className="text-sm">@username</span>
            </div>
          </Profile>
          <div className="flex w-9/12 justify-between py-5">
            <span><span className="font-bold">0</span> Followers</span>
            <span><span className="font-bold">0</span> Following</span>
          </div>
          <p className="px-2">{createIpsum()}</p>
        </Bio>
      </div>
    </Home>
  )
}

const Profile = styled.div.attrs({className:`
  flex 
  w-full
  items-center
`})`
`

const Home: any = styled(Container).attrs({className:`
  flex-col-reverse
  justify-center
  lg:flex-row
`})``