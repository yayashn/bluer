import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import './tailwind.css';
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import Chat from "./components/chat";

export default () => {
  const [user, setUser]:any = useState(null);
  const [users, setUsers]: any = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const on: any = [];
    let online: any;
    on.push(onValue(ref(db, `/users/`), snapshot => {
        const data = snapshot.val();
        setUsers(data);
    }));

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      online = setInterval(() => {
        if(currentUser){
          set(ref(db, `/users/${currentUser!.email!.split('@')[0]}/last-seen`), new Date().getTime());
        }
      }, 5000);
    })

    return () => {
        if(online) clearInterval(online);
        on.map((v: any) => {
          v();
        })
    }
  },[])

  return (
    <BrowserRouter>
        {!loading && 
        user?.accessToken &&
        <>
          <Navbar users={users} user={user} setUser={setUser}/>
          <Chat users={users} username={user.email.split('@')[0]}/>
        </>}
        <Routes>
          <Route path={'/'} element={!user ? <Login/> : <Navigate to={`users/${user ? user.email.split('@')[0] : ''}`}/>}/>
          {users && user && user.email && <Route path='users/:userPage' element={<Home username={user.email.split('@')[0]} users={users}/>}/>}
        </Routes>
    </BrowserRouter>
  )
}