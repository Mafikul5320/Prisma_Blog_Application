import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const CreatePost = async (data: Omit<Post, "id" | "updateAt" | "createAt" | "authorId">, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data, authorId: userId
        }
    })
    return result;
}

export const PostService = {
    CreatePost
}