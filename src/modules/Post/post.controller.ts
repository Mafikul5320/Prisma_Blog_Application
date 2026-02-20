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
    const { search, authorId } = req.query;
    const searchString = typeof search === 'string' ? search : undefined
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    const orderBy = req.query.orderBy;
    const sortBy = req.query.sortBy
    const tags = req.query.tag ? (req.query.tag as string).split(",") : [];
    const isFeatured = req.query.isFeatured !== undefined ? req.query.isFeatured === "true" : undefined;
    console.log(isFeatured);
    const result = await PostService.AllPost(searchString as string, tags, isFeatured as boolean, authorId as string, limit, skip, orderBy as string, sortBy as string);
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