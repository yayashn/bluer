import Home from './components/home/index';
import createIpsum from 'corporate-ipsum';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './tailwind.css';
import Blackout  from './components/common/Blackout';
import postsState from './atoms/postsState';
import { useRecoilState } from 'recoil';
import alertState from './atoms/alertState';
import Navbar from './components/navbar/index';

const placeholderText:any = [];
for (let i = 0; i < 10; i++) {
  placeholderText.push(createIpsum(2));
}

export default () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {
    setAlert(null);
  }, [posts])

  return (
    <Router>
      <Navbar/>
      {alert !== null && <Blackout/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<>profile</>}/>
      </Routes>
    </Router>
  )
}

