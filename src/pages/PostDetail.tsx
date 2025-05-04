import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IPost } from "../interfaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostDetailSkeleton from "../components/skeletons/PostDetailSkeleton";
import CommentSection from "../sections/CommentSection";
import timeAgo from "../utils/timeAgo";

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<
    { status?: number; message?: string } | undefined
  >(undefined);
  const { postId } = useParams();
  const navigate = useNavigate();

  //Gets Post data
  const fetchPostDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/posts/post/${postId}`);
      setPostDetails(response.data?.post);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch Post Details", setError);
    } finally {
      setLoading(false);
    }
  };

  //Navigates back to Posts page if there is no postId found
  useEffect(() => {
    if (!postId) {
      navigate("/posts", { replace: true });
      return;
    }
    fetchPostDetails();
  }, [postId]);

  return (
    <>
      <Header />
      <main className={`p-6 sm:px-[5%] items-center justify-center py-12`}>
        {!loading ? (
          <>
            {!error ? (
              <>
                <NavLink
                  replace={true}
                  className="self-start mb-2 flex items-center gap-2 hover:text-primary/80 transition"
                  to="/posts"
                >
                  <FaArrowLeft /> Go back to Posts
                </NavLink>
                {/* // Post details */}
                <div className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full rounded-lg drop-shadow-[4px, 0px, 4px] drop-shadow-primary">
                  <h2 className="text-3xl break-words font-semibold focus:outline-none align-middle border-none rounded-md break-all">
                    {postDetails?.title}
                  </h2>

                  <pre
                    role="textbox"
                    className="resize-none text-wrap w-full focus:outline-none align-middle border-none rounded-md break-all"
                  >
                    {postDetails?.content}
                  </pre>
                  <p>
                    Posted by{" "}
                    <NavLink
                      to={`/author/${postDetails?.authorId}`}
                      className="underline text-primary hover:text-primary-hover transition cursor-pointer"
                    >
                      <b>{`${postDetails?.author?.firstName} ${postDetails?.author?.lastName}`}</b>
                    </NavLink>{" "}
                    {postDetails?.createdAt && timeAgo(postDetails.createdAt)}
                  </p>
                </div>
                <CommentSection
                  postId={postDetails?.id}
                  authorId={postDetails?.authorId}
                />
              </>
            ) : (
              // Error
              <>
                <h2 className="text-[4rem] sm:text-[8rem] font-bold text-center col-span-full">
                  {error?.status}
                </h2>
                <p className="text-center relative bottom-4 text-2xl col-span-full">
                  {error?.message || "Internal Error"}
                </p>
                <NavLink
                  to="/posts"
                  replace
                  className="mt-2 text-md font-semibold cursor-pointer text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
                >
                  Go back to Posts
                </NavLink>
              </>
            )}
          </>
        ) : (
          // Skeleton (in loading state)
          <PostDetailSkeleton />
        )}
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
