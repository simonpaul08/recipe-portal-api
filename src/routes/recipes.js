import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/User.js'


const router = express.Router();


// get all recipes

router.get('/', async (req, res) => {
    try{
        const response = await RecipeModel.find({})
        res.json(response)
    }catch(e) {
        res.json(e)
    }
})

// create new recipe 

router.post('/', async (req, res) => {
    const recipe = new RecipeModel(req.body);

    try {
        const response = await recipe.save();
        res.json(response)
    }catch(e) {
        res.json(e)
    }
})


// get single recipe 

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await RecipeModel.findOne({ _id: id });

    if(!recipe) return res.json({ message: "Recipe not found" });

    res.json(recipe);
})


router.put('/', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({ savedRecipes: user.savedRecipes })
    }catch(e) {
        res.json(e)
    }
})


export { router as recipeRouter }