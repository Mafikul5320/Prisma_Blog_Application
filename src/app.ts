import express, { Application } from 'express'
import { PostRouter } from './modules/Post/post.route'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors'

const app: Application = express()
app.use(express.json())
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true
}))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/post", PostRouter);
app.use("/posts",PostRouter)

export default app;