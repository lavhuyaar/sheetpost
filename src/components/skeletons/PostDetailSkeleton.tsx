const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-2 w-full">
      <span className="h-8 animate-pulse w-3/5 bg-surface" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="h-4 animate-pulse bg-surface" />
        ))}
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
