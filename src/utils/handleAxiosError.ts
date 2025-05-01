import { SetStateAction } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const handleAxiosError = (
  error: unknown,
  helperMessage?: string,
  setError?: React.Dispatch<
    SetStateAction<{ status?: number; message?: string } | undefined>
  >
) => {
  console.error(error, helperMessage ? ` :: ${helperMessage}` : "");
  if (isAxiosError(error)) {
    toast.dismiss();
    toast.error(error.response?.data?.message || helperMessage); //Error snackbar
    if (setError) {
      setError({
        status: error.status,
        message: error.response?.data?.message || "Internal Server Error",
      });
    }
    throw error;
  } else {
    toast.dismiss();
    toast.error("An error occured! Please try again!");
  }
};

export default handleAxiosError;
