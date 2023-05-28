import React, { useState,useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {database} from '../firebase'
function Like({userData,postData}) {
    // console.log('like--->',userData,postData)
    const [like,setLike]=useState(null)
    const [update,setUpdate] = useState(false)

    useEffect(()=>{
        let check=postData.likes.includes(userData.userId)?true:false
        setLike(check)
    },[postData])
    const handleLike=()=>{
          if(like===true){
            let narr= postData.likes.filter((item)=> item!==userData.userId )
            database.posts.doc(postData.postId).update({
                likes:narr
            })
           
        }
        else{
            let narr= [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes:narr
            })

        }
        console.log(postData.likes)
    }
  return (
    <div>
      {
        like!=null?
        <>
        {
            like===true?<FavoriteIcon fontSize='medium' onClick={handleLike} className={`like icon-styling`}/>:<FavoriteBorderIcon onClick={handleLike} fontSize='medium' className='icon-styling unlike' />
        }
        </>:
        <></>
      }
    </div>
  )
}

export default Like