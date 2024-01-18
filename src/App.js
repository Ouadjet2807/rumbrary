import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Recipes from "./components/Recipes"
import AddRecipes from "./components/AddRecipes"
import Navigation from "./components/Navigation"

function App() {
 
  return ( 
 
      <BrowserRouter basename="/rumbrary">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home /> }></Route> 
                <Route path="/*" element={<Home /> }></Route> 
                <Route path="/recipes" element={<Recipes /> }></Route> 
                <Route path="/add_recipes" element={<AddRecipes /> }></Route> 
                {/* <Route exact path="/:folderId" element={<Display /> }></Route> 
                <Route path="/visiteurs" element={<Display /> }></Route> 
                <Route path="/statistiques" element={<Display /> }></Route> 
                <Route path="/mon_compte" element={<Display /> }></Route> 
                <Route path="/dashBoard" element={<Display /> }></Route> 
                <Route path="/mot_de_passe_oublie" element={<Display /> }></Route> 
                <Route path="/offres_d'emploi" element={<Display />}></Route>
                <Route path="/offre/:offerID" element={<Display />}></Route> */}
            </Routes>
        </BrowserRouter>
  )
  
  
}

export default App;