import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import './tailwind.css';
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";

export default () => {
  const [user, setUser]:any = useState(null);
  const [users, setUsers]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const { userPage } = useParams();

  useEffect(() => {
    const on: any = [];
    on.push(onValue(ref(db, `/users/`), snapshot => {
        const data = snapshot.val();
        setUsers(data);
    }));

    if(user) {
      set(ref(db, `/users/${user.email.split('@')[0]}/last-seen`), new Date().getTime());
    }

    return () => {
        on.map((v: any) => {
          v();
        })
    }
  },[])

  setInterval(() => {
      if(user) {
        set(ref(db, `/users/${user.email.split('@')[0]}/last-seen`), new Date().getTime());
      }
  }, 5000);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  })

  return (
    <BrowserRouter>
        {!loading && 
        user?.accessToken &&
        <Navbar users={users} user={user} setUser={setUser}/>}
        <Routes>
          <Route path={'/'} element={!user ? <Login/> : <Navigate to={`users/${user ? user.email.split('@')[0] : ''}`}/>}/>
          {users && user && user.email && <Route path='users/:userPage' element={<Home username={user.email.split('@')[0]} users={users}/>}/>}
        </Routes>
    </BrowserRouter>
  )
}