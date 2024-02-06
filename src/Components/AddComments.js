import React,{useState} from 'react'
import { Button, TextField } from '@mui/material'
import { database } from '../firebase'
function AddComments({userData,postData}) {
    const [text,setText]=useState()
    const handleClick=()=>{
      const obj={
        text: text,
        userProfileImage:userData.profileUrl,
        uName: userData.fullName
      }
      database.comments.add(obj).then((doc) =>{
        database.posts.doc(postData.postId).update({
          comments: [...postData.comments,doc.id]
        })
      })
      setText('')
    }
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem"}}>
      <TextField id="outlined-basic" label="Comments" size="small"variant="outlined" value={text} sx={{width:280}} onChange={(e)=>setText(e.target.value)}/>
      <Button variant='contained' size="medium" onClick={handleClick}>Post</Button>
    </div>
  )
}


export default AddComments
