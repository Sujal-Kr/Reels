import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material';
import { database } from '../firebase'
import Video from './Video'
import './Post.css'
import Like from './Like'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';

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
    const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      parr = []
      querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id }
        parr.push(data)
        setPosts(parr)
        
      })

      return unsub()
    })
  }, [])

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
                      <div className="comment-cont">
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image="/static/images/cards/contemplative-reptile.jpg"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                Lizard
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" >
                              Share
                            </Button>
                          </CardActions>
                          <Typography >{post.likes.length===0?"":`Liked by ${post.likes.length} users`}</Typography>
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
