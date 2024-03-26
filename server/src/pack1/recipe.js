import mongoose from "mongoose";

const recipeschema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    ingredients:[{type:String,required:true}],
    instructions:{type:String,required:true},
    imageUrl:{type:String,required:true},
    cookingtime:{type:Number,required:true},
    Owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
    },
});

export const recipemodel = mongoose.model("recipes",recipeschema) ;