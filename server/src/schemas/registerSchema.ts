import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4)
    .required()
});
