const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <span className="h-28 animate-pulse w-full bg-surface" />
      <span className="h-6 animate-pulse w-full flex gap-3">
        <span className="animate-pulse h-full w-full bg-surface" />
        <span className="animate-pulse w-[100px] h-full bg-surface" />
        <span className="animate-pulse w-[100px] h-full bg-surface" />
      </span>
    </div>
  );
};

export default CommentSkeleton;
