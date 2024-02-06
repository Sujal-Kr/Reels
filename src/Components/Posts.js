import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material';
import { database } from '../firebase'
import Video from './Video'
import './Post.css'
import Like from './Like'
import Like2 from './Like2';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AddComments from './AddComments';
import Comments from './Comments';

function Posts({ userData }) {
 
  const [posts, setPosts] = useState(null)
  const [open, setOpen] = useState(null)
  const handleClickOpen = (id) => {
    setOpen(id)
  }

  const handleClose = () => {
    setOpen(null)
  }
  useEffect(() => {
    let parr = []
      const unsub =  database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
        parr = []
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id }
          parr.push(data)
          setPosts(parr)
          
        })
        return unsub()
      })
  },[])
  const callback = (enteries)=>{
    enteries.forEach((entry)=>{
        let ele = entry.target.querySelector('video');
        if (entry.isIntersecting) {
            ele.play().catch((error) => console.error(error));
        } else {
            ele.pause();
        }
    })

}
  let observer = new IntersectionObserver(callback, {threshold:0.6})
  useEffect(()=>{
    const element = document.querySelectorAll(".videos")
    element.forEach((item)=>{
        observer.observe(item)
    })
    return ()=>{
      observer.disconnect()
    }
  },[posts])

  return (
    <div>
      {
        posts == null || userData == null ?
          <CircularProgress /> :
          <div className="video-cont" >
            {
              posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos" >
                    <Video src={post.pUrl} />
                    <div className='fa' style={{ display: "flex",alignItems:"center" }}>
                      <Avatar alt="Remy Sharp" src={userData.profileUrl} />
                      <h3>{userData.fullName}</h3>
                    </div>
                    <Like userData={userData} postData={post}/>
                    <ChatBubbleOutlineIcon className='chat-styling' fontSize='medium' onClick={()=>handleClickOpen(post.pId)}/>
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
      }
    </div>
  )
}

export default Posts
