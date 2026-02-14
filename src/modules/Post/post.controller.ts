import { Request, Response } from "express";
import { PostService } from "./post.service";

const CreatePost = async (req: Request, res: Response) => {
    const result = await PostService.CreatePost(req.body);
    console.log(req.body)
    try {
        res.status(201).json({
            message: "Post Create Sucessfull",
            data: result
        })
    } catch (error) {
        res.status(404).json(error)
    }
}

export const PostController = {
    CreatePost
}