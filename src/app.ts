import express, { Application } from 'express'
import { PostRouter } from './modules/Post/post.route'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

const app: Application = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/post", PostRouter)

export default app;