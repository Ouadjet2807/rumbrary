import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {gsap} from 'gsap'
import {db} from '../firebase-config'
import {doc, setDoc, addDoc, collection} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

export default function AddRecipes() {

  const [submitSuccess, setSubmitSuccess] = useState()
  const [validation, setValidation] = useState("")
  let [numberOfIngredients, setNumberOfIngredients] = useState(4)
  const [ingredientsInput, setNewIngredientsInput] = useState([{name: `ingredient${numberOfIngredients+1}`, register: `ingredient${numberOfIngredients+1}`, placeHolder: `Ingrédient ${numberOfIngredients}`}])
 
  useEffect(() => {
   ingredientsInput.shift()
 }, []);

  const [images, setImages] = useState([])
  let ingredients = []
  const { register, handleSubmit, setError, reset, formState: {errors, isSubmitting, isSubmitted, isSubmitSuccessful }  } = useForm({
    mode: 'onChange',
  })


  let initialMouseMove = true
  let timer

  const mouseMove = (e) => {
    if (initialMouseMove) {
      // it's not the first mouse move anymore, 
      // so we won't run this again 
      initialMouseMove = false
      
      gsap.to(".fruits img", {
        scale: 1,
        stagger: 0.02,
        ease: 'sine.out'
      })
    }
    clearTimeout(timer);
    // set a timer for 0.2 second 
    timer = setTimeout(mouseStopped,20);


    let X = e.clientX;
    let Y = e.clientY;
    let ctx = gsap.context(() => {
      gsap.to(".fruits img", {
        top: (Y - 120) + "px",
        left: (X - 120) + "px",
        opacity: 1,
        stagger: 0.1
      })

    })
  }

  const mouseStopped = () => {
    initialMouseMove = true
    
    gsap.to(".fruits img", {
      scale: 0,
      stagger: 0.02,
      ease: 'sine.out'
    })
  }

  const fetchAPI = async () => {
    if(ingredients.length > 0) {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${ingredients[2]}+fruit&client_id=2W20MvWu-HIBAMbntEeYQCAja-lW1I_lfJ6qGFGUMaA&per_page=1`);
      console.log(ingredients[2]);
      console.log(response.data.results);
      let data = response.data.results
      setImages(data.map(elem => elem.urls.small))
      console.log(images);
    } else {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=rum+fruit&client_id=2W20MvWu-HIBAMbntEeYQCAja-lW1I_lfJ6qGFGUMaA&per_page=1`);
      console.log(response.data.results);
      let data = response.data.results
      setImages(data.map(elem => elem.urls.small))
      console.log(images);
    }
    
    
  }

  const addInput = async (e) => {
    e.persist()
    setNumberOfIngredients(numberOfIngredients+1)
    console.log(numberOfIngredients)
    
    setNewIngredientsInput([...ingredientsInput, { name: `ingredient${numberOfIngredients}`, register: `ingredient${numberOfIngredients}`, placeHolder: `Ingrédient ${numberOfIngredients}` }])
     
  
    console.log(ingredientsInput);
  }

  let handleChange = (i, e) => {
    let newIngredientsInput = [...ingredientsInput];
    newIngredientsInput [i][e.target.name] = e.target.value;
    setNewIngredientsInput(newIngredientsInput);
  }
  

  const onSubmit = async (data) => {
    let id = uuidv4()
    let title = "Aucun titre"
    let quantity = ""
    let preparation = ""
    let soaking = ""
    let instructions = ""
    let image = ""
    let url



    if(data.title) {
      title = data.title
    }

    if(data.quantity) {
      quantity = data.quantity
    }

    if(data.preparation) {
      preparation = data.preparation
    }

    if(data.soaking) {
      soaking = data.soaking
    }

    if(data.ingredient1) {
      ingredients.push(data.ingredient1)
    }

    if(data.ingredient2) {
      ingredients.push(data.ingredient2)
    }

    console.log(images);
    
    if(data.ingredient3) {
      ingredients.push(data.ingredient3)
    }
    
    
    if(data.ingredient4) {
      ingredients.push(data.ingredient4)
      let queryIngredient = data.ingredient4
      let ingredientRegex = [
        /abricots/,
        /amande/,
        /anis + étoilé/,
        /ananas/,
        /avocat + fruit/,
        /baies + de + goji/,
        /banane/,
        /basilic/,
        /cannelle/, 
        /cacao/,
        /cardamome/,
        /citron/,
        /clémentines/,
        /clou + de + girofle/,
        /combava/,
        /concombre/,
        /coriandre/,
        /cranberries/,
        /curcuma/,
        /dattes/,
        /figues/, 
        /fleurs + de + sureau/, 
        /framboise/,
        /fruits + de + la + Passion/,
        /fraises/, 
        /gingembre/,
        /guimauve/,
        /hibiscus/,
        /jasmin/, 
        /kumquat/,
        /litchi/,
        /mangue/,
        /miel/,
        /mûre/,
        /noisette/,
        /orange/, 
        /pêche/,
        /thym/,
        /papaye/,
        /persil/,
        /piment + Espelette/,
        /piment + oiseau/,
        /pin + Sylvestre/,
        /pistaches/,
        /poivre/, 
        /pop-corn/,
        /poire/,
        /pomelo/,
        /pomme/,
        /potiron/,
        /praliné/,
        /pruneaux/,
        /romarin/,
        /réglisse/,
        /rhubarbe/,
        /rose/,
        /tomate/,
        /vanille/, 
        /wasabi/,
]
      const ingredientMatch = ingredientRegex.filter(rx => rx.test(queryIngredient))
      const ingredient = ingredientMatch.toString().replaceAll('/', '')
      console.log(ingredient);
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${ingredient}&client_id=2W20MvWu-HIBAMbntEeYQCAja-lW1I_lfJ6qGFGUMaA&per_page=1`)
      let datas = response.data.results
      url = datas[0].urls.regular
      setImages(url)
      console.log(url);
    } 
    else {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=rum+fruit&client_id=2W20MvWu-HIBAMbntEeYQCAja-lW1I_lfJ6qGFGUMaA&per_page=1`);
      console.log(response.data.results);
      let datas = response.data.results
      url = datas[0].urls.regular
      console.log(url);
      setImages(url)
    }

    if(data.ingredient5) {
      ingredients.push(data.ingredient5)
    }

    if(data.ingredient6) {
      ingredients.push(data.ingredient6)
    }
    if(data.ingredient7) {
      ingredients.push(data.ingredient7)
    }
    if(data.ingredient8) {
      ingredients.push(data.ingredient8)
    }
    if(data.ingredient9) {
      ingredients.push(data.ingredient9)
    }
    if(data.ingredient10) {
      ingredients.push(data.ingredient10)
    }
    if(data.ingredient11) {
      ingredients.push(data.ingredient11)
    }
    if(data.ingredient12) {
      ingredients.push(data.ingredient12)
    }
  

    if(data.instructions) {
      instructions = data.instructions
    }

    image = images
    console.log(image);
    
    try {

      let recipeInfo = {}
      setTimeout( async () => {
        
        if(image) {
          
        recipeInfo = {
        ID: id,
        IMAGE: url,
        TITLE: title,
        QUANTITY: quantity,
        PREPARATION: preparation,
        SOAKING: soaking,
        INGREDIENTS: ingredients,
        INSTRUCTIONS: instructions
      }
      
    } else {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=rum+fruit&client_id=2W20MvWu-HIBAMbntEeYQCAja-lW1I_lfJ6qGFGUMaA&per_page=1`);
      let datas = response.data.results
      url = datas[0].urls.regular
      console.log(datas);
      
      recipeInfo = {
        ID: id,
        IMAGE: image,
        TITLE: title,
        QUANTITY: quantity,
        PREPARATION: preparation,
        SOAKING: soaking,
        INGREDIENTS: ingredients,
        INSTRUCTIONS: instructions
      }
      
    }
    const ref = collection(db, "recipes")
    const docRef = setDoc(doc(ref, id), recipeInfo)
    
    setSubmitSuccess(true)
    setValidation("Votre recette à bien été enregistré 💗")
  }, 2000);
  } catch(error) {
      console.log(error);
      setSubmitSuccess(false)
      setValidation("Une erreur s'est produite, veuillez réessayer ultérieurement 😵")
    }


    console.log(data);
  }

  return (
    <div className="content" onMouseMove={mouseMove}>
         <h1>Rumbrary</h1>
          <div className="fruits">
           <img id="pineApple" src="http://nina-roethinger.fr/rumbrary//Assets/Pineapple.png" alt="" />
           <img id="banana" src="http://nina-roethinger.fr/rumbrary//Assets/banana.png" alt="" />
           <img id="cinnamon" src="http://nina-roethinger.fr/rumbrary//Assets/cinnamon.png" alt="" />
          </div>
       

          
              {submitSuccess === true ? 
              <>
              <div className="validation success">
                <span>{validation}</span>
              </div>

                <button className="back" onClick={() => setSubmitSuccess()}>Retour</button>

              </>
              
              : 
            
              submitSuccess === false ?
              <> 
              <div className="validation error">
                <span>{validation}</span>
              </div>

              <button className="back" onClick={() => setSubmitSuccess()}>Retour</button>
              </>

              :
           <div className="formBox">
             <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} name="title" type="text" id="titre" placeholder="Titre"/>
              <div className="info">
                  <input {...register("quantity")} name="quantity" type="text" placeholder="Quantité (exemple : 1.25 litre)"/>
                  <input {...register("preparation")} name="preparation" type="text" placeholder="Temps de préparation"/>
                  <input {...register("soaking")} name="soaking" type="text" placeholder="Temps de macération"/>
                  <div className="ingredients">
                    <input {...register("ingredient1")} name="ingredient1" type="text" placeholder="Ingrédient 1"/>
                    <input {...register("ingredient2")} name="ingredient2" type="text" placeholder="Ingrédient 2"/>
                    <input {...register("ingredient3")} name="ingredient3" type="text" placeholder="Ingrédient 3"/>
                    {ingredientsInput.length > 1 && ingredientsInput.map((element, index) => {
                     return <input {...register(`${element.register}`)} key={uuidv4()} name={element.name} type="text" placeholder={element.placeHolder}/>
                    })}
                  </div>
                    <div className="addInput" onClick={addInput}>Ajouter un ingrédient</div>
              </div>
              <textarea {...register("instructions")} name="instructions" id="instructions" cols="30" rows="10" placeholder="Instructions"></textarea>

                <button id="submit">Envoyer</button>
               </form>
              </div>
              }
      
        
    </div>
  )
}
