import { Avatar, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
function Comments({postData}) {
    const [comments,setComments]=useState(null)
    useEffect(()=>{
        const fetchComments = async () => {
            let arr = []
            for (let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
            }
            setComments(arr)
        }
      
         fetchComments()
    },[postData])
  return (
    <div>
      {
        comments===null?<CircularProgress/>:
        <>
            {
                comments.map((comment,index)=>{
                    return (
                        <div key={index} style={{display:"flex",gap:"1rem",padding:"0.2rem 0"}}>
                            <Avatar  src={comment.userProfileImage}/>
                            <p>
                                <span style={{fontSize:"0.8rem",color:"grey"}}>{comment.uName}</span>
                                <br />
                                {comment.text}
                            </p>
                        </div>
                    )
                })
            }
        </>
      }
    </div>
  )
}

export default Comments
