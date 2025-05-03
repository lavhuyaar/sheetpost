import { useNavigate } from "react-router";

import { IPost } from "../interfaces";

import timeAgo from "../utils/timeAgo";

const PostCard: React.FC<IPost> = ({
  title,
  id,
  content,
  createdAt,
  authorId,
  author,
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/posts/${id}`);
  };

  const authorNameOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/author/${authorId}`);
  };

  return (
    <>
      <div
        key={id}
        onClick={handleOnClick}
        className="bg-surface flex flex-col gap-2 px-5 py-4 rounded-md sm:hover:scale-110 transition-hover drop-shadow-[1px_1px_2px] drop-shadow-text-primary/20 hover:z-50 duration-300 ease-in-out cursor-pointer"
      >
        <h3
          title={title}
          className="min-h-4 text-xl font-semibold w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
        >
          {title}
        </h3>
        <p className="h-28 text-xs w-full whitespace-break-spaces text-wrap overflow-ellipsis overflow-hidden">
          {content}
        </p>

        <h5 className="text-sm">
          {author ? (
            <>
              {" "}
              Posted by{" "}
              <button
                className="text-primary underline hover:text-primary-hover transition cursor-pointer"
                onClick={authorNameOnClick}
              >
                {author?.firstName} {author?.lastName}
              </button>{" "}
            </>
          ) : (
            "Posted "
          )}
          {timeAgo(createdAt)}
        </h5>

        <div className="h-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm">{timeAgo(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
