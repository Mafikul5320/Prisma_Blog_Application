import { prisma } from "../../lib/prisma";

const CommentCreate = async (payload: {
  content: string;
  author_id: string;
  post_id: string;
  parent_id?: string;
}) => {
  console.log("CommentCreate Payload:", payload);
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

export const CommentService = {
  CommentCreate
}