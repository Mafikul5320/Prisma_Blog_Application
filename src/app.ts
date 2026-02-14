import express, { Application } from 'express'
import { PostRouter } from './modules/Post/post.route'

const app: Application = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/post", PostRouter)

export default app;