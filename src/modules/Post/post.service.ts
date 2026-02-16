import { Post, Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const CreatePost = async (data: Omit<Post, "id" | "updateAt" | "createAt" | "authorId">, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data, authorId: userId
        }
    })
    return result;
};

const AllPost = async (payload: string, tags: string[] | []) => {
    const andCondition: Prisma.PostWhereInput[] = [];
    console.log(tags)

    // If no search payload, return all posts
    // if (!payload) {
    //     return await prisma.post.findMany();
    // }
    if (payload) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: payload,
                        mode: 'insensitive'
                    },
                },
                {
                    tag: {
                        has: payload
                    }
                }
            ],
        })
    }
    if (tags.length > 0) {
        andCondition.push({
            tag: {
                hasSome: tags
            }
        });
    }


    const result = await prisma.post.findMany({
        where: {
            OR: andCondition
        }
    });
    return result;
}

export const PostService = {
    CreatePost,
    AllPost
}