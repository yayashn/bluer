import { Bio } from "./Bio";
import { Container } from "../common/Container";
import MainPost from "./MainPost";
import Posts from "./Posts";
import { ProfilePic } from "../common/ProfilePic";

export default () => {
  return (
    <Container>
      <div className='flex flex-col mr-5'>
        <MainPost/>
        <Posts/>
      </div>
      <div className='flex flex-col flex-grow'>
        <Bio>
          <ProfilePic/>
        </Bio>
      </div>
    </Container>
  )
}