import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import './tailwind.css';
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

export default () => {
  const [user, setUser]:any = useState(null);
  const [users, setUsers]: any = useState(null);
  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    const on: any = [];
    on.push(onValue(ref(db, `/users/`), snapshot => {
        const data = snapshot.val();
        setUsers(data);
    }));

    return () => {
        on.map((v: any) => {
          v();
        })
    }
  },[])

  useEffect(() => {
    if(user) {
      const on = onValue(ref(db, `/posts/${user.email.split('@')[0]}`), snapshot => {
        const data = snapshot.val();
        setPosts(data);
      });
      return () => {
        on();
      }
    }
  }, [user])

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (
    <BrowserRouter>
        {user?.accessToken && <Navbar user={user} setUser={setUser}/>}
        <Routes>
          <Route path="/" element={user?.accessToken && <Home posts={posts} user={users && users[user.email.split('@')[0]]}/> || !user && <Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  )
}