import { prisma } from "../../lib/prisma";

const CommentCreate = async (payload: {
  content: string;
  author_id: string;
  post_id: string;
  parent_id?: string;
}) => {

  await prisma.post.findUniqueOrThrow({
    where: {
      post_id: payload.post_id
    }
  });

  if (payload.parent_id) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        comment_id: payload.parent_id
      }
    });
  }



  const parent_id = (payload.parent_id && payload.parent_id !== "" && payload.parent_id !== "null" && payload.parent_id !== "undefined")
    ? payload.parent_id
    : null;

  return await prisma.comment.create({
    data: {
      content: payload.content,
      author_id: payload.author_id,
      post_id: payload.post_id,
      parent_id: parent_id
    }
  });
};

const OneComment = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      comment_id: id
    },
    include: {
      postId: {
        select: {
          views: true,
          title: true
        }
      }
    }
  })
}

export const CommentService = {
  CommentCreate,
  OneComment
}