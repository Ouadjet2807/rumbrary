import React, { useEffect } from 'react'
import {gsap} from 'gsap'

export default function Home() {

    const mouseEnter = () => {
        let ctx = gsap.context(() => {
            gsap.to(".homePageVisuals img", {
             left: "62%" 
            })
            gsap.to("#pineApple", {  
             transform: "rotateZ(0deg)",
             duration: 0.3
            })
            gsap.to("#banana", {  
             transform: "rotateZ(-15deg)",
             duration: 0.3
            })
            gsap.to("#cinnamon", {  
             transform: "rotateZ(-45deg)",
             duration: 0.3
            })
            
        })
    }

    const mouseLeave = () => {
        let ctx = gsap.context(() => {
            gsap.to(".homePageVisuals img", {
            left: "60%" 
            })
            gsap.to("#pineApple", {  
             transform: "rotateZ(15deg)",
             duration: 0.3
            })
            gsap.to("#banana", {  
             transform: "rotateZ(0deg)",
             duration: 0.3
            })
            gsap.to("#cinnamon", {  
             transform: "rotateZ(0deg)",
             duration: 0.3
            })
            
        })
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".homePageVisuals img", {  
             opacity: 1,
             duration: 2
            })
            gsap.to("#pineApple", {  
             top: "25%",
             duration: 1
            })
            gsap.to("#banana", {  
             top: "40%",
             duration: 1
            })
            gsap.to("#cinnamon", {  
             top: "45%",
             duration: 1
            })
            gsap.to("#pineApple", {  
             transform: "rotateZ(15deg)",
             delay: 1,
             duration: 0.3
            })
            gsap.to("#banana", {  
             transform: "rotateZ(0deg)",
             delay: 1,
             duration: 0.3
            })
            gsap.to("#cinnamon", {  
             transform: "rotateZ(0deg)",
             delay: 1,
             duration: 0.3
            })
            
        })
    }, [])

  return (
    <div className="content">
        <h1>Rumbrary</h1>

      <div className="homePageVisuals">
        <div className="text_box">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora atque illo voluptatem, exercitationem in quibusdam! Ab cum sunt odit ratione molestias corporis! Repellat ex, delectus dolor voluptate quo nihil unde?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora atque illo voluptatem, exercitationem in quibusdam! Ab cum sunt odit ratione molestias corporis! Repellat ex, delectus dolor voluptate quo nihil unde?</p>
        </div>
        <div className="images" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
           <img id="pineApple" src="http://nina-roethinger.fr/rumbrary//Assets/Pineapple.png" alt="" />
           <img id="banana" src="http://nina-roethinger.fr/rumbrary//Assets/banana.png" alt="" />
           <img id="cinnamon" src="http://nina-roethinger.fr/rumbrary//Assets/cinnamon.png" alt="" />
        </div>
      </div>
    </div>
  )
}
