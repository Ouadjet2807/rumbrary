import React from 'react'
import {NavLink} from 'react-router-dom'
import {gsap} from 'gsap'

export default function Navigation() {

 const mouseMove = (e) => {
    let X = e.clientX;
    let Y = e.clientY;
    let ctx = gsap.context(() => {
        gsap.to(".cursor img", {
            display: "block",
            opacity: 1,
            top: Y + "px",
            left: X + "px",
            duration: 0.3
        })
    })
 }

 const mouseLeave = () => {
    let ctx = gsap.context(() => {
        gsap.to(".cursor img", {
            display: "none",
            opacity: 0,
            duration: 0.3
        })
    })
 }

  return (
    <>
    <div className="cursor"><img src="http://nina-roethinger.fr/rumbrary/Assets/Pineapple.png" alt="" /></div>
    <nav className="naviguation" onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
        <ul>
            <li>  
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/add_recipes">Ajouter une recette</NavLink>
            </li>
            <li>
                <NavLink to="/recipes">les recettes</NavLink>
            </li>
        </ul>
    </nav>
    </>
  )
}
