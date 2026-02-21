import { Request, Response } from "express";
import { PostService } from "./post.service";
import Pagination from "../../helpers/Pagination";

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
    const { limit, skip, orderBy, sortBy, page } = Pagination(req.query)
    const tags = req.query.tag ? (req.query.tag as string).split(",") : [];
    const isFeatured = req.query.isFeatured !== undefined ? req.query.isFeatured === "true" : undefined;
    console.log(isFeatured);
    const result = await PostService.AllPost(searchString as string, tags, isFeatured as boolean, authorId as string, limit, skip, orderBy as string, sortBy as string, page as number);
    try {
        res.status(201).json({
            message: "All Post Get Sucessfull",
            data: result
        })
    } catch (error) {
        res.status(404).json(error)
    }
};

const OnePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("Need Post Id");
    }
    const result = await PostService.OnePost(id as string);

    try {
        res.status(201).json({
            message: "Post Get Sucessfull",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}

export const PostController = {
    CreatePost,
    AllPost,
    OnePost
}