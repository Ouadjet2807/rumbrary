import React, {useEffect, useState} from 'react'
import {doc, collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase-config'
import Recipe from "./Recipe";

export default function Recipes() {
  
    const [recipes, setRecipes] = useState([])
    const [filteredArr, setFilteredArr] = useState([])
    const [searchOn, setSearchOn] = useState(false)
    const [search, setSearch] = useState("")
    const [isEmpty, setIsEmpty] = useState("")
    const [images, setImages] = useState([])

    let ingredientsArr = recipes.map(item => item.INGREDIENTS.toString())

    console.log(recipes);
    console.log(ingredientsArr);

    
    const loadRecipes = async () =>  {
        setRecipes([])
        const ref = collection(db, 'recipes');
        const querySnapshot = await getDocs(ref)
        querySnapshot.forEach((doc) => {
         
          setRecipes(recipes => [doc.data(), ...recipes])
            
        }) 
      
      }

      useEffect(() => {
        loadRecipes()
      }, []);

      const handleSuggest = async (e) => {
        setSearch(e.target.value.toLowerCase())
        let filterByTitle = recipes.filter(item => item.TITLE.includes(search.toLowerCase()))
        let matchingIngredients = recipes.filter(item => item.INGREDIENTS.toString().includes(search.toLowerCase()))
        if(filterByTitle) {
          setFilteredArr(filterByTitle)
        } else if(matchingIngredients) {
          setFilteredArr(matchingIngredients)
        } else {
          setSearchOn(false)
        }
       
       
        console.log(search);
        console.log(searchOn);
 
         if(filteredArr.length > 1) {
             setSearchOn(true)
         }
         if(filteredArr.length === 0) {
             setIsEmpty(true)
         } else {
             setIsEmpty(false)
         }

         console.log(filteredArr);
     }


  return (
    <div className="content">
         <h1>Rumbrary</h1>
          <div className="recipesWrapper">
            <div className="searchBar">
              <input type="text" onKeyUp={handleSuggest} placeholder="Rechercher une recette"/>
            </div>

            {searchOn === true ? 
              filteredArr.map(item => {
           return <Recipe 
                      key={item.ID}
                      id={item.ID}
                      image={item.IMAGE} 
                      title={item.TITLE}
                      quantity={item.QUANTITY}
                      preparation={item.PREPARATION}
                      soaking={item.SOAKING}
                      ingredients={item.INGREDIENTS}
                      instructions={item.INSTRUCTIONS}
                    />
              })
           :
           <>
              {recipes.map(item => {
        
                return <Recipe
                        key={item.ID}
                        id={item.ID}
                        image={item.IMAGE} 
                        title={item.TITLE}
                        quantity={item.QUANTITY}
                        preparation={item.PREPARATION}
                        soaking={item.SOAKING}
                        ingredients={item.INGREDIENTS}
                        instructions={item.INSTRUCTIONS}
                      />
                
              })}
            </>
          }
           
          </div>
        
    </div>
  )
}
