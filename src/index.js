import express from 'express'
import cors from 'cors'
import connectToMongo from './config/db.js'
import { userRouter } from './routes/users.js'
import { recipeRouter } from './routes/recipes.js'


const app = express()
connectToMongo()

app.use(express.json())
app.use(cors())



app.use('/auth', userRouter)
app.use('/recipes', recipeRouter)


app.listen(3001, () => {
    console.log('server started')
})