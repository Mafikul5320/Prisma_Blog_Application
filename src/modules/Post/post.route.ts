import express from 'express'
import { PostController } from './post.controller';
import { Middleware } from '../../middleware/authentication';

const router = express.Router()

router.post("/", Middleware("USER"), PostController.CreatePost)
router.get("/", PostController.AllPost);
router.get("/:id", PostController.OnePost);


export const PostRouter = router;