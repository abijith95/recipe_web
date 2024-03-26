import {useState} from "react";
import axios from "axios";
import { useGetUser } from "../hooks/useGetuser.js";
import { useNavigate } from "react-router-dom";
export const Creation = () => {
    const userid = useGetUser();
    const [recipes,setRecipe] = useState({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingtime: 0,
        
        Owner:userid,
    });
     const navigate = useNavigate();
    const handleChange = (event) =>{
        const {name,value} =event.target;
        setRecipe({...recipes,[name]:value});
    }
    const handleIngredientChange = (event,idx) =>{
        const {value} =event.target;
        const ingredients = [...recipes.ingredients];
        ingredients[idx] = value;
        setRecipe({...recipes,ingredients});
    }
    const handleaddIngredient = () => {
        const ingredients = [...recipes.ingredients,""]
        setRecipe({...recipes,ingredients})

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
          await axios.post("http://localhost:3002/recipes",recipes);
          alert("Recipe Created");
          navigate('/')
        }
        catch(err){
            console.error(err);
        }
    }
    return (
    <div className="creation"><h2> Create Recipe</h2>
    <form onSubmit={onSubmit}>
        <label htmlFor="name"> Recipe Name </label>
        <input type="text" id="name" name="name" value={recipes.name} onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients needed</label>
        {recipes.ingredients.map((ingredient,idx) => (
             <input key={idx} type="text" name="ingredients" value={ingredient} onChange = {(event) =>handleIngredientChange(event,idx) }/>
            
        ))}
        <button onClick={handleaddIngredient} type="button">Add Ingredients needed</button>
        <label htmlFor="instructions">Instruction for cooking</label>
        <textarea  id="instructions" name="instructions"  value={recipes.instructions}onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">ImageUrl</label>
        <input type="text" id="imageUrl" name="imageUrl" value={recipes.imageUrl} onChange={handleChange}/>
        <label htmlFor="cookingtime">CookingTime</label>
        <input type="number" id="cookingtime"  value ={recipes.cookingtime} name="cookingtime" onChange ={handleChange} />
        <button  type="submit">Create New</button>
    </form>
    </div>
    
    );

}