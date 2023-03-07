import express from 'express'
import cors from 'cors'
import connectToMongo from './config/db.js'
import { userRouter } from './routes/users.js'


const app = express()
connectToMongo()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "Home Page" })
})


app.use('/auth', userRouter)


app.listen(3001, () => {
    console.log('server started')
})