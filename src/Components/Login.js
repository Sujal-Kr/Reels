import * as React from 'react';
import { useState } from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert  from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import  {Link, NavLink}  from 'react-router-dom';
import bg from '../Assests/back.png'
import { CarouselProvider, Slider, Slide,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Login.css'
import image1 from '../Assests/1.png'
import image2 from '../Assests/2.png'
import image3 from '../Assests/3.png'
import image4 from '../Assests/4.png'
import { AuthContext } from '../Context/Authcontext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
const store=useContext(AuthContext)
const [email,setEmail]=useState()
const [pass,setPass]=useState()
const[loading,setLoading]=useState(false)
const[error,setError]=useState('')
const {login}=useContext(AuthContext)

const navigate=useNavigate()
console.log(store)
const handleLogin=async()=>{
    try{
        setError('')
        setLoading(true)
        let res=await login(email,pass)
        setLoading(false)
        navigate('/')
        
        
    }catch(err){
        setError(err.message)
        setTimeout(()=>{
            setError('')
            setLoading(false)
        },2000)
    }

}
const handleReset=()=>{
    navigate('/reset')
}
  return (
    <div className="loginwrapper">
        <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
            <div className="car">
            <CarouselProvider
                naturalSlideWidth={238}
                naturalSlideHeight={500}
                visibleSlides={1}
                isPlaying={true}
                infinite={true}
                totalSlides={4}
                dragEnabled={false}
                touchEnabled={false}
                >
                <Slider>
                    <Slide index={0}><Image src={image1}/></Slide>
                    <Slide index={1}><Image src={image2}/></Slide>
                    <Slide index={2}><Image src={image3}/></Slide>
                    <Slide index={3}><Image src={image4}/></Slide>
                </Slider>
            </CarouselProvider>
            </div>
        </div>
        <div className="logincard">
            <Card variant='outlined' className='card-cont' >
                <CardContent>
                <Typography variant='h3' textAlign="center"  gutterBottom>
                    Instagram
                </Typography>
                {error!=='' && <Alert severity="error">{error}</Alert>}
                <TextField id="filled-basic" label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}} fullWidth={true} margin="dense" size="small" />
                <TextField id="filled-basic" label="Password" type="password"  value={pass} onChange={(e)=>{setPass(e.target.value)}} variant="outlined" fullWidth={true} margin="dense" size="small"/>
                <Typography color="primary"  sx={{fontSize:"14px",textAlign:"center",margin:"0.4rem"}} component="div" onClick={handleReset} >
                    Forgot Password?
                </Typography>
                </CardContent>
                <CardActions>
                <Button color='primary'size="large" variant='contained' onClick={handleLogin} fullWidth disabled={loading}>Login</Button>
                </CardActions>
            
            </Card>
            <Card className='bottom-card' variant='outlined'>
                <Typography color="text.secondary"  sx={{fontSize:"14px",textAlign:"center",width:"27vw"}} component="div" margin="dense" >
                    Don't have an Account? <Link to="/signup" >Sign Up</Link>
                </Typography>
            </Card>
        </div>
    </div>
  );
}