import { useRecoilState } from 'recoil';
import styled from 'styled-components'; 
import alertState from '../../atoms/alertState';
import postsState from '../../atoms/postsState';
import { Alert } from './Alert';
import { DeleteButton } from '../home/DeleteButton';
import Button from './Button';

export default () => {
  const [posts, setPosts]: any = useRecoilState(postsState);
  const [alert, setAlert]: any = useRecoilState(alertState);

  return (
    <Blackout>
      <Alert>
        <div className='mb-5'>Are you sure you want to delete this post?</div>
        <div className="flex justify-between w-full">
          <Button
            onTap={()=>setAlert(null)}
          >Cancel</Button>
          <DeleteButton onClick={
            ()=>{
              const newPosts: any = {};
              let found = 0;
              Object.entries(posts).map(([i,v]: any)=> {
                if(i == alert) {
                  found = 1;
                }
                if(i !== alert) {
                  newPosts[i - found] = v;
                }
              })
              setPosts(newPosts);
            }}>
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
