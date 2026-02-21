import { date } from "better-auth";
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

const AllPost = async (payload: string | undefined, tags: string[], isFeatured: any, authorId: string, limit: number, skip: number, OrderBy: string, sortBy: string, page: number) => {

    const andCondition: Prisma.PostWhereInput[] = [];

    if (payload) {
        andCondition.push({
            OR: [
                { title: { contains: payload, mode: 'insensitive' } },
                { tag: { has: payload } }
            ],
        });
    }

    if (tags.length > 0) {
        andCondition.push({ tag: { hasSome: tags } });
    }

    if (isFeatured !== undefined) {
        andCondition.push({ isFeatured: isFeatured === true });
    }


    if (authorId) {
        andCondition.push({ authorId });
    };

    const result = await prisma.post.findMany({
        where: andCondition.length > 0 ? { AND: andCondition } : {},
        take: limit,
        skip,
        orderBy: {
            [sortBy]: OrderBy
        }
    });
    const total = await prisma.post.count({
        where: {
            AND: andCondition
        }
    })

    return {
        result,
        pagination: {
            total,
            limit,
            page,
            totalPage: Math.ceil(total / limit)

        }
    };
};

const OnePost = async (id: string) => {

    return await prisma.$transaction(async (tx) => {

        await tx.post.update({
            where: {
                post_id: id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        const result = await tx.post.findUnique({
            where: {
                post_id: id
            }
        });
        return result
    })

}

export const PostService = {
    CreatePost,
    AllPost,
    OnePost
}