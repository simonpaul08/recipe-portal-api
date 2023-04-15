import express from 'express'
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

    const value = req.body;
    const recipe = await RecipeModel(value);
    const response = await recipe.save();

    if(!response) return res.status(500).send('Error Occured')

    res.status(200).send('Recipe Created')
    
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

    const { id } = req.params;
    const response = await RecipeModel.deleteOne({ _id: id })

    if(!response) return res.status(500).send('Error Occured!!')

    res.status(200).send('Recipe Deleted')
})

export { router as recipeRouter }


