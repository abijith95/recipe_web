import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {userRouter} from "./routers/user.js";
import {reciperouter} from "./routers/recipe1.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter); 
app.use("/recipes", reciperouter); 

app.listen(3002,()=>console.log("connected to server"));
 
mongoose.connect("mongodb+srv://abijith:Abikuttan@recipeapp.ptjntep.mongodb.net/recipes?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
).then(console.log("connected to db"));