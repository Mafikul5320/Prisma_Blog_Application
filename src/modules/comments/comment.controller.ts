import { NextFunction, Request, Response } from "express";
import { CommentService } from "./comment.service";

const CommentCreate = async (req: Request, res: Response, next: NextFunction) => {
    const User = req.user;
    req.body.author_id = User?.id

    console.log("Comment Create Req Body:", req.body);
    try {
        const result = await CommentService.CommentCreate(req.body);
        res.status(201).json({
            message: "Comment Create Sucessfull",
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const OneComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CommentService.OneComment(req.params.commentId as string)
        res.status(201).json({
            message: "Comment Get Sucessfull",
            data: result
        })
    } catch (error) {
        next()
    }
};

export const CommentController = {
    CommentCreate,
    OneComment
}