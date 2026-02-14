import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const CreatePost = async (data: Omit<Post, "id" | "updateAt" | "createAt">) => {
    const result = await prisma.post.create({ data })
    return result;
}

export const PostService = {
    CreatePost
}