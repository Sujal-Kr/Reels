import React,{useContext,useState} from 'react'
import './Reset.css'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import Alert  from '@mui/material/Alert';
import { AuthContext } from '../Context/Authcontext';
function Reset() {
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const {resetpassword}=useContext(AuthContext)
    const handleClick=async()=>{
        if(email===''){
            setError("cant't leave this field empty")
            setTimeout(()=>{
                setError('')
            },2000)
        }
        try{
            setLoading(true)
            await resetpassword(email)
            setLoading(false)
        }catch(err){
            setError(err.message)
            setTimeout(()=>{
                setError('')
            },2000)
        }

    }
  return (
    <div className='reset-wrapper'>
        {error!=='' && <Alert severity="error">{error}</Alert>}
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} size="small" onChange={(e)=>{setEmail(e.target.value)}}/>
        <Button variant='contained' size="large" onClick={handleClick}disabled={loading}>Reset </Button>
    </div>
  )
}

export default Reset
