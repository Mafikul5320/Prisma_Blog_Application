import { Request, Response } from "express";
import { PostService } from "./post.service";

const CreatePost = async (req: Request, res: Response) => {
    const result = await PostService.CreatePost(req.body, req.user?.id as string);
    console.log(req.body)
    try {
        res.status(201).json({
            message: "Post Create Sucessfull",
            data: result
        })
    } catch (error) {
        res.status(404).json(error)
    }
};

const AllPost = async (req: Request, res: Response) => {
    const { search } = req.query;
    const searchString = typeof search === 'string' ? search : undefined

    const tags = req.query.tag ? (req.query.tag as string).split(",") : [];


    const result = await PostService.AllPost(searchString as string, tags);
    try {
        res.status(201).json({
            message: "All Post Get Sucessfull",
            data: result
        })
    } catch (error) {
        res.status(404).json(error)
    }
};

export const PostController = {
    CreatePost,
    AllPost
}