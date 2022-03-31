import { useRecoilState } from 'recoil';
import styled from 'styled-components'; 
import alertState from '../../atoms/alertState';
import postsState from '../../atoms/postsState';
import { Alert } from './Alert';
import { DeleteButton } from './DeleteButton';
import { NormalButton } from './NormalButton';

export default () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [alert, setAlert] = useRecoilState(alertState);

  return (
    <Blackout>
      <Alert>
        <div className='mb-5'>Are you sure you want to delete this post?</div>
        <div className="flex justify-between w-full">
          <NormalButton
            onTap={()=>setAlert(null)}
          >Cancel</NormalButton>
          <DeleteButton onTap={()=>setPosts(posts.filter(p => p.key !== alert))}>
            Delete
          </DeleteButton>
        </div>
      </Alert>
    </Blackout>
  )
}

const Blackout = styled.div.attrs({
  className: `
  fixed
  flex
  justify-center
  items-center
  top-0
  left-0
  w-screen
  h-screen
  z-10
` })`background-color: rgba(0,0,0,0.7);`;
