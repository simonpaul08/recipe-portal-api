import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/User.js'


const router = express.Router();


// get all recipes
router.get('/', async (req, res) => {
    try{
        const response = await RecipeModel.find({})
        if(response.length === 0) return res.status(404).send('No Recipes Added')
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

// get recipes for a specific user
router.post('/user/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const user = await UserModel.findOne({ _id: id })
        const recipes = await RecipeModel.find({ userOwner: user._id })
        res.status(200).send(recipes)
        
    }catch(e) {
        console.log(e)
    }

})

// delete a specific recipe
router.delete('/recipe/delete/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const recipe = await RecipeModel.deleteOne({ _id: id })
        if(!recipe) return res.status(500).send('Internal Error')

        const recipes = await RecipeModel.find({})
        res.status(200).send({ recipes, message: "Recipe delete successfully" })

    }catch(e) {
        console.log(e)
    }
})

export { router as recipeRouter }


