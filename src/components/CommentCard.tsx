import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { IComment } from "../interfaces";
import handleAxiosError from "../utils/handleAxiosError";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import commentSchema from "../validators/commentSchema";

interface ICommentProps extends IComment {
  getComments: () => Promise<void>;
}

const CommentCard = ({
  getComments,
  content,
  id,
  user,
  userId,
}: ICommentProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const { userInfo } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({ resolver: yupResolver(commentSchema) });

  const editComment = async (values: { content: string }) => {
    toast.loading("Editing comment...");
    try {
      await axiosInstance.put(`/comments/comment/${id}`, values);
      toast.dismiss();
      toast.success("Comment edited successfully!");
      reset();
      await getComments();
    } catch (error) {
      handleAxiosError(error, "Failed to edit comment!");
    }
  };

  //Deletes comment
  const deleteComment = async () => {
    toast.loading("Deleting comment...");
    try {
      await axiosInstance.delete(`/comments/comment/${id}`);
      toast.dismiss();
      toast.success("Comment deleted successfully!");
      await getComments();
    } catch (error) {
      handleAxiosError(error, "Failed to delete comment!");
    } finally {
      setIsModalOpen(false);
    }
  };

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    reset();
    setIsEditMode(false);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  //Animates Delete Comment modal
  useEffect(() => {
    if (!isModalOpen) {
      const timeout = setTimeout(() => setIsVisible(false), 10);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="rounded-md border-text-primary/10 p-4 border-1 flex flex-col w-full">
        {!isEditMode ? (
          <>
            <h4>
              <b>{user?.username}</b> (
              {userInfo?.id === userId
                ? "You"
                : `${user?.firstName} ${user?.lastName}`}
              )
            </h4>
            <pre>{content}</pre>
            {userInfo?.id === userId && (
              <div className="flex items-center self-end">
                <button
                  onClick={enableEditMode}
                  title="Edit post"
                  type="button"
                  className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
                >
                  <RiEditBoxLine />
                </button>
                <button
                  onClick={openDeleteModal}
                  title="Delete post"
                  type="button"
                  className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            )}{" "}
          </>
        ) : (
          // Edit comment form
          <form
            className="border-primary w-full flex flex-col gap-1"
            onSubmit={handleSubmit(editComment)}
          >
            <textarea
              placeholder="New comment..."
              defaultValue={content}
              className="resize-none border-text-primary/10 min-h-[150px] w-full focus:outline-none align-middle border rounded-md px-3 py-2"
              id="content"
              {...register("content", { required: true })}
            />
            <p className="text-red-500 text-sm w-full">
              {errors.content?.message}
            </p>
            <div className="flex items-center gap-3">
              <button
                className="secondary-btn"
                type="button"
                onClick={disableEditMode}
              >
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Edit Comment
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Delete modal */}
      {isModalOpen && (
        <div
          className={`transition-all duration-200 bg-background/80 fixed inset-0 z-[9999] flex items-center justify-center`}
        >
          <div
            className={`${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            } flex flex-col items-center justify-center p-4 transition-all duration-200 w-4/5 max-w-[400px] h-auto bg-surface rounded-md`}
          >
            <h4 className="text-[1.2rem] text-center">
              Do you confirm to delete this comment?
            </h4>
            <em className="text-[11px] text-center mt-1">
              (it cannot be restored later)
            </em>

            <div className="flex items-center w-full justify-center gap-4 mt-4">
              <button onClick={closeDeleteModal} className="secondary-btn">
                Cancel
              </button>
              <button onClick={deleteComment} className="primary-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCard;
