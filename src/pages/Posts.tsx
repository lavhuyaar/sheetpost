import { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IPost } from "../interfaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

const POSTS_LIMIT: number = 12;

const Posts = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<
    { status?: number; message?: string } | undefined
  >(undefined);

  //Fetches all the published posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/posts?limit=${POSTS_LIMIT}&page=${currentPage}`
      );
      const { posts, postsCount } = response.data;
      setPosts(posts);
      setPostsCount(postsCount);
    } catch (error) {
      handleAxiosError(error, "Failed to get posts", setError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentPage) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getPosts();
  }, [currentPage]);

  return (
    <>
      <Header />

      <main
        className={`${
          error ? "justify-center" : ""
        } p-6 gap-4 text-2xl font-semibold`}
      >
        <div
          className={`posts ${
            error
              ? "self-center justify-self-center"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          } relative h-full`}
        >
          {!loading ? (
            <>
              {!error ? (
                <>
                  <h1 className="px-2 col-span-full">
                    All Posts {postsCount !== null ? `(${postsCount})` : ""}
                  </h1>
                  {posts && posts.length > 0 ? (
                    <>
                      {posts.map((post) => (
                        <PostCard key={post?.id} {...post} />
                      ))}
                      <Pagination
                        className="col-span-full mt-4"
                        limit={POSTS_LIMIT}
                        currentPage={currentPage}
                        totalDataLength={postsCount as number}
                        setCurrentPage={setCurrentPage}
                      />
                    </>
                  ) : (
                    <div className="h-[60vh] flex items-center justify-center text-center col-span-full">
                      No posts
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
              <div className="animate-pulse h-8 w-4/5 sm:w-1/5 ml-2 bg-surface col-span-full" />
              {Array.from({ length: POSTS_LIMIT }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Posts;
