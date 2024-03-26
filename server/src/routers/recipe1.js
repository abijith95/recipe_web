import express from 'express';
import mongoose from 'mongoose';
import {recipemodel} from "../pack1/recipe.js";
import { usermodel } from '../pack1/User.js';

const router = express.Router();
router.get("/",async(req,res)=>{
    try{
       const response = await recipemodel.find({});
       res.json(response);
    }
    catch(err){
        res.json(err);
    }
})
router.post("/",async(req,res)=>{
    const recipe = new recipemodel(req.body);
    try{
       const response = await recipe.save();
       res.json(recipe);
    }
    catch(err){
        res.json(err);
    }
});

router.put("/",async(req,res)=>{
 try{
    const recipe = await recipemodel.findById(req.body.recipeID)
    const user  = await usermodel.findById(req.body.userId);
    user.savedrecipes.push(recipe);
    await user.save();
    res.json({savedrecipes:user.savedrecipes});
    }
    catch(err){
        res.json(err);
    }
});

router.get("/savedrecipes/ids",async(req,res)=>{
    try {
        const user = await usermodel.findById(req.body.userID);
        res.json({savedrecipes:user.savedrecipes});
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedrecipes",async(req,res)=>{
    try {
        const user = await usermodel.findById(req.body.userID);
        const savedrecipes =await recipemodel.find({
            _id: {$in:user.savedrecipes},
        })
        res.json({savedrecipes});
    } catch (err) {
        res.json(err);
    }
});

export{router as reciperouter}