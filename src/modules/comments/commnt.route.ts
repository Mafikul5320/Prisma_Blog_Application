import express from 'express'
import { CommentController } from './comment.controller';
import { Middleware } from '../../middleware/authentication';
const router = express.Router();


router.post("/", Middleware("USER", "ADMIN"), CommentController.CommentCreate);
router.get("/:commentId", CommentController.OneComment)

export const CommentRouter = router