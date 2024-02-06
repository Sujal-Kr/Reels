import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {database} from '../firebase'
import { CircularProgress, Typography } from '@mui/material'

import Like2 from './Like2';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';

import AddComments from './AddComments';
import Comments from './Comments';
import Navbar from './Navbar'
import './Profile.css'

function Profile() {
  const {id}=useParams()
  const [userData,setUserData] = useState(null)
  const [posts,setPosts] = useState(null)
  const [open, setOpen] = useState(null)
  const handleClickOpen = (id) => {
    setOpen(id)
  }

  const handleClose = () => {
    setOpen(null)
  }
  useEffect(()=>{
    database.users.doc(id).onSnapshot((snap)=>{
      setUserData(snap.data())
    })
  },[id])
  useEffect(()=>{
    async function fetchPostsData(){
      if(userData!==null){
        let parr=[]
        for(let i=0;i<userData.postIds.length;i++){
          let postData=await database.posts.doc(userData.postIds[i]).get()
          parr.push({...postData.data(),postId:postData.id})
        }
        setPosts(parr)
      }
    } 
    fetchPostsData()
  })
  return (
    <div>
      {
        userData==null || posts==null?<CircularProgress/>:
        <>
          <Navbar userData={userData}/>
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl}/>
              </div>
              <div className="info">
                <Typography variant="h5">
                  {userData.fullName}
                </Typography>
                <Typography variant="h6">
                  {userData.postIds.length }{" "}posts
                </Typography>
              </div>
            </div>
            <hr style={{margin:"3% 0"}}/>
            <div className="profile-video-cont" >
            {
              posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos" >
                    <video onClick={()=>handleClickOpen(post.pId)}>
                      <source src={post.pUrl} ></source>
                    </video>
                    
                    <Dialog
                      open={open===post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth='md'
                    >
                      <div className="modal-cont" style={{display:"flex"}}>
                      <div className="modal-video">
                        <video controls >
                          <source src={post.pUrl} ></source>
                        </video>
                      </div>
                      <div className="comment-cont" >
                        <Card variant='oulined'className='card1' >
                          <Comments postData={post}/>
                        </Card>
                        <Typography >{post.likes.length===0?"":`Liked by ${post.likes.length} users`}</Typography>
                        <Card variant="outlined"  >
                        <div style={{display:"flex",alignItems:"center",margin:"0.4rem"}}>
                          <Like2 userData={userData} postData={post} />
                          <AddComments userData={userData} postData={post}/>
                        </div>
                        </Card>
                      </div>
                      </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              ))  
            }
          </div>
          </div>
        </>
      }
    </div>
  )
}

export default Profile
