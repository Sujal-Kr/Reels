import React, { useEffect } from 'react'
import vid1 from '../Assests/ReelsVideo/video1.mp4'
import vid2 from '../Assests/ReelsVideo/video2.mp4'
import vid3 from '../Assests/ReelsVideo/video3.mp4'
import vid4 from '../Assests/ReelsVideo/video4.mp4'

function Ioa() {
    const callback = (enteries)=>{
        enteries.forEach((entry)=>{
            let ele = entry.target.querySelector('video');
            console.log(ele)
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
      },[])
  return (
    <div className='video-conts'>
        <div className="videos">
            <video style={{height:"84vh"}}>
                <source src={vid1} ></source>
            </video>
        </div>
        <div className="videos">
            <video style={{height:"84vh"}}>
                <source src={vid2} ></source>
            </video>
        </div>
        <div className="videos">
            <video style={{height:"84vh"}}>
                <source src={vid3} ></source>
            </video>
        </div>
        <div className="videos">
            <video style={{height:"84vh"}}>
                <source src={vid4} ></source>
            </video>
        </div>
      
    </div>
  )
}

export default Ioa
