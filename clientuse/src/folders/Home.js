import { useEffect , useState } from "react";
import axios from "axios";
export const Home = () => {
    const [recipes,setRecipes] = useState([]);

    useEffect(() => {
          const fetchRecipe = async () => {
            try{
               const response =  await axios.get("http://localhost:3002/recipes");
               setRecipes(response.data)
              }
              catch(err){
                  console.error(err);
              }
          }
          fetchRecipe();
    },[]);
    return (
    <div> 
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe) =>(
              <li key={recipe._id}>
              <div>
                 <h2>{recipe.name}</h2>
                 <h2>{recipe.ingredients}</h2>
              </div>
              <div className="instructions">
                  <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name}/>
              <p>Cooking Time: {recipe.cookingtime} minutes</p>
          </li>    
            ))}
        </ul>
    </div>
    );
}