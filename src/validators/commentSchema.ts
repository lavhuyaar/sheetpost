import * as yup from "yup";

const commentSchema = yup.object({
  content: yup
    .string()
    .trim()
    .test(
      "length",
      "Comment must be atleast 1 letter and cannot be more than 1000 letters",
      (value) => typeof value === "string" && value.trim().length >= 1 && value.trim().length <= 1000
    )
    .required(),
});

export default commentSchema;
