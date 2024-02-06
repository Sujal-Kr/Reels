import * as React from 'react';
import { useState ,useContext} from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert  from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import  {Link, useNavigate}  from 'react-router-dom';
import './SignUp.css'
import {  CloudUploadOutlined,  } from '@mui/icons-material';
import bg from '../Assests/back.png'
import { CarouselProvider, Slider, Slide,  Image } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import image1 from '../Assests/1.png'
import image2 from '../Assests/2.png'
import image3 from '../Assests/3.png'
import image4 from '../Assests/4.png'
import { AuthContext } from '../Context/Authcontext';
import {storage} from '../firebase'
import { database } from '../firebase';


export default function SignUp() {
  const [email, setEmail]=useState('')
  const [pass, setPassword]=useState('')
  const [name,setName]=useState('')
  const [file, setFile]=useState(null)
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate= useNavigate()
  const {signup}=useContext(AuthContext)
    const handleSignup= async()=>{
        if(file=== null){
            setError('please Upload Your Profile Image First')
            setTimeout(()=>{
                setError('')
            },2000)
            return
        }
        try{
            setError('')
            setLoading(true)
            let userData= await signup(email,pass)
            let uid=userData.user.uid
            let uploadTask=storage.ref(`/users/${uid}/ProfileImage`).put(file)
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
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullName:name,
                        profileUrl:url,
                        postIds:[],
                        createdAt: database.getTimeStamp
                    })
                })
                setLoading(false)
                navigate('/')
            }
        }catch(err){
            setError(err.message)
            setTimeout(()=>{
                setError('')
            },5000)
        }
    }
  return (
    <div className="signupwrapper">
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
        <div className="signupcard">
            <Card variant='outlined' className='card-cont' >
                <CardContent>
                <Typography variant='h3' textAlign="center"  gutterBottom>
                    Instagram
                </Typography>
                <div className="profile-cont">
                    
                </div>
                <Typography color="text.secondary" sx={{fontSize:"14px",textAlign:"center"}} component="div" margin="dense" >
                    Sign Up to see Photos and videos from your friends
                </Typography>
                {error!=='' && <Alert severity="error">{error}</Alert>}
                <TextField onChange={(e)=>setEmail(e.target.value)} value={email} id="filled-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" />
                <TextField onChange={(e)=>setPassword(e.target.value)} value={pass} id="filled-basic" label="Password" type="password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                <TextField onChange={(e)=>setName(e.target.value)} value={name} id="filled-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense"size="small"   />
                <Button variant="outlined" color='secondary' size="medium" fullWidth={true} component="label" startIcon={<CloudUploadOutlined/>}>Upload Your Profile Picture
                <input type="file"  accept="image/*" hidden  onChange={(e)=>setFile(e.target.files[0])}/>
                </Button>
                </CardContent>
                <CardActions>
                <Button color='primary'size="large" variant='contained' fullWidth disabled={loading} onClick={handleSignup}>Sign Up</Button>
                </CardActions>
                <Typography color="text.secondary" sx={{fontSize:"14px",textAlign:"center",margin:"1rem 0"}} component="div" margin="dense" >
                    By Signing you agree to our terms ,Data Policy and Cookies Policy.
                </Typography>
            </Card>
            <Card className='bottom-card' variant='outlined'>
                <Typography color="text.secondary"  sx={{fontSize:"14px",textAlign:"center",width:"27vw"}} component="div" margin="dense" >
                    Allready Have an Account? <Link to="/login" >Login</Link>
                </Typography>
            </Card>
        </div>
    </div>
  );
}