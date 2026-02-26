import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const CommentCreate = async (req: Request, res: Response) => {
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
        console.log("Error in CommentController:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
};

const OneComment = async (req: Request, res: Response) => {
    try {
        const result = await CommentService.OneComment(req.params.commentId as string)
        res.status(201).json({
            message: "Comment Get Sucessfull",
            data: result
        })
    } catch (error) {
        console.log("Error in CommentController:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export const CommentController = {
    CommentCreate,
    OneComment
}