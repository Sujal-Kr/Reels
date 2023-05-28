import React,{useContext,useState,useEffect} from 'react'
import UploadFile from './UploadFile';
import { AuthContext } from '../Context/Authcontext';
import {database} from '../firebase';
import Posts from './Posts';
function Feed() {
  const {user,logout}=useContext(AuthContext)
  const [userData,setUserData] =useState('')
  useEffect(()=>{
    const unsub=database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
    })
    return ()=>{
      unsub()
    }
  },[user])
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
      <div style={{width:"50%"}}>
      <h1>Welcome To Instagram </h1>
      <button onClick={logout}> Logout</button>
      </div>
      <UploadFile user={userData}/>
      <Posts userData={userData}/>
    </div>
  )
}

export default Feed