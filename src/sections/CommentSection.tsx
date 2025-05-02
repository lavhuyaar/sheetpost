import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IComment } from "../interfaces";

import CommentCard from "../components/CommentCard";
import CommentSkeleton from "../components/skeletons/CommentSkeleton";
import commentSchema from "../validators/commentSchema";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

const CommentSection = ({
  postId,
  authorId,
}: {
  postId?: string;
  authorId?: string;
}) => {
  const { userInfo } = useAuth();

  const [comments, setComments] = useState<IComment[] | null>(null);
  const [error, setError] = useState<
    { status?: number; message?: string } | undefined
  >(undefined);
  const [commentsCount, setCommentsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({ resolver: yupResolver(commentSchema) });

  //Fetch comments of a post
  const getComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/comments/comment/${postId}/all`
      );
      const { comments, totalCount } = response.data;
      setComments(comments);
      setCommentsCount(totalCount);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch comments!", setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postId || !authorId) return;
    getComments();
  }, [postId, authorId]);



  const addComment = async (values: { content: string }) => {
    toast.loading('Adding comment...')
    try {
      await axiosInstance.post("/comments/new", {
        ...values,
        authorId,
        postId,
      });
      reset();
      toast.dismiss();
      toast.success('Comment added!');
      await getComments();
    } catch (error) {
      handleAxiosError(error, "Failed to add comment!");
    }
  };

  return (
    <section className="w-full rounded-md flex flex-col gap-4 mt-4 bg-surface p-4">
      {!loading ? (
        <>
          {!error ? (
            <>
              <h1 className="px-2 col-span-full text-2xl">
                Comments {commentsCount !== null ? `(${commentsCount})` : ""}
              </h1>
              {comments && comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <CommentCard
                      key={comment?.id}
                      {...comment}
                      getComments={getComments}
                    />
                  ))}
                </>
              ) : (
                <div className="h-[60vh] flex items-center justify-center text-center col-span-full">
                  No comments
                </div>
              )}
              {userInfo ? (
                // Add Comment form
                <form
                  className="border-primary w-full flex flex-col gap-1"
                  onSubmit={handleSubmit(addComment)}
                >
                  <textarea
                    placeholder="New comment..."
                    className="resize-none border-text-primary/10 min-h-[150px] w-full focus:outline-none align-middle border rounded-md px-3 py-2"
                    id="content"
                    {...register("content", { required: true })}
                  />
                  <p className="text-red-500 text-sm w-full">
                    {errors.content?.message}
                  </p>
                  <button type="submit" className="primary-btn">
                    Add Comment
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-3 items-center my-4">
                  <h5 className="text-2xl text-center">Login to comment</h5>
                  <NavLink to="/login" className="primary-btn">
                    Login
                  </NavLink>
                </div>
              )}
            </>
          ) : (
            // Error
            <>
              <h2 className="text-[4rem] sm:text-[8rem] font-bold text-center">
                {error?.status}
              </h2>
              <p className="text-center relative bottom-4 text-2xl">
                {error?.message}
              </p>
            </>
          )}
        </>
      ) : (
        // Skeleton posts
        <>
          <div className="animate-pulse h-8 w-4/5 sm:w-1/5 sm:ml-2 bg-surface col-span-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </>
      )}
    </section>
  );
};

export default CommentSection;
