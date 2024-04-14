import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter email"),
  password: yup.string().required("Please enter your password"),
  confirmPassword: yup
    .string()
    .required("Please enter confirm password")
    .oneOf([yup.ref("password")], "password and confirm password does't match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Please enter email"),
  password: yup.string().required("Please enter your password"),
});
