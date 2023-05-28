import React, { useState } from 'react'
import  {Alert, Button, LinearProgress}  from '@mui/material'
import {database, storage} from '../firebase'
import {v4 as uuidv4} from 'uuid'

function UploadFile(props) {
    const [error,setError]=useState('')
    const [loading,setLoading] = useState(false)
    
    const handleChange = async(file) =>{
        
        if(file==null){
            setError('Please provide a file')
            setTimeout(()=>{
                setError()
            },2000)
        }
        if(file.size/(1024*1024)>100){
            setError('File size is too large')
            setTimeout(()=>{
                setError('')
            },2000)
            return
        }
        let uid=uuidv4()
        setLoading(true)
        let uploadTask=storage.ref(`/posts/${uid}/${file.name}`).put(file)
            uploadTask.on('state_changed',fn1,fn2,fn3)
            //                       progress,error,success
            function fn1(snapshot){
                let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
                console.log(`progress is ${progress}`)
            } 
            function fn2(error){
                setError(error.message)
                setTimeout(()=>{
                    setError('')
                },2000)
                setLoading(false)
                return
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url)
                    let obj={
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName:props.user.fullName,
                        uProfile:props.user.profileUrl,
                        userId:props.user.userId,
                        createdAt: database.getTimeStamp,
                        
                    }
                    database.posts.add(obj).then(async(ref)=>{

                        let res= await database.users.doc(props.user.userId).update({
                            postIds:props.user.postIds!=null?[...props.user.postIds,ref.id]:[ref.id]
                        })
                    }).then(()=>{
                        setLoading(false)

                    }).catch((err)=>{
                        setError(err.message)
                        setTimeout(()=>{
                            setError('')
                        },2000)
                    })
                })
                setLoading(false)
            }
    }
  return (
    <div>
      {error!=='' ? <Alert severity="error">{error}</Alert>:
        <>
            <input type="file" id="upload" accept='video/*' onChange={(e)=>handleChange(e.target.files[0])} style={{display:"none"}}/>
            <label htmlFor="upload" >
                <Button 
                style={{margin:"1rem 0"}}
                variant='contained' 
                color='secondary'
                component='span'
                disabled={loading}
                >
                Upload Video
                </Button>
            </label>
            {loading&&<LinearProgress color='primary' />}
        </>
      }
    </div>
  )
}

export default UploadFile
