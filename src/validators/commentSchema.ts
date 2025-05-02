import * as yup from "yup";

const commentSchema = yup.object({
  content: yup
    .string()
    .trim()
    .test(
      "length",
      "Comment must be atleast 1 letter",
      (value) => typeof value === "string" && value.trim().length >= 1
    )
    .required(),
});

export default commentSchema;
