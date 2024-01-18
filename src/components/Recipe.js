import React, {useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import {v4 as uuidv4} from 'uuid'
import {doc, collection, deleteDoc, query, where} from 'firebase/firestore'
import {db} from '../firebase-config'


export default function Recipe({title, quantity, preparation, soaking, ingredients, instructions, image, id}) {
    
    const [modal, setModal] = useState(false)
    console.log(id);

    const delAlert = async () => {
    //  confirm('Confirmez vous la suppression de la recette ?')
      if ( window.confirm("Confirmez vous la suppression de la recette ?") == true) {
        delRecipe()
      } else {
      }
    }

    const delRecipe = async () => {
      const ref = doc(db, "recipes", id)
      await deleteDoc(ref)
      window.location.reload()
    }


  return (
    <>
    <div className="recipe" onClick={() => setModal(true)}>
        <div className="img_box">
          <img src={image} alt="" />
        </div>
        <div className="info">
        <h2>{title}</h2>
        <h4>Pour : {quantity}</h4>
        <h4>Préparation : {preparation}</h4>
        <h4>Macération : {soaking}</h4>
        </div>
      
    </div>
        {modal === true ?
            <div className="modal">

                  <div className="overlay" onClick={() => setModal(false)}></div>
                  <div className="modalBox">
                    <div className="close" onClick={() => setModal(false)}><RxCross2 /></div>
                     <h2>{title}</h2>
                  <div className="info">
                    <h4>Pour : {quantity}</h4>
                    <h4>Préparation : {preparation}</h4>
                    <h4>Macération : {soaking}</h4>
                  </div>
                  <ul className="ingredients">
                    {ingredients.map(item => {
                      return <li key={uuidv4()}>- {item}</li>
                    }
                    )}
                  </ul>
                  <p>{instructions}</p>

                    <div className="buttons">
                      <button onClick={delAlert}>Supprimer la recette</button>
                      <button>Modifier la recette</button>
                    </div>
                  </div>
            </div>

            : ""
        }
    </>         
 
  )
}
