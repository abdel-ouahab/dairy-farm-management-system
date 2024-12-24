import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

export const registerSchema = yup.object().shape({
    firstname: yup.string().lowercase().required("First name is required"),
    lastname: yup.string().lowercase().required("Last name is required"),
    username: yup.string().required("Username is required"),
    age: yup.number().required("Age is required").positive().integer(),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  export const todoSchema = yup.object().shape({
    description: yup
    .string()
    .required("Task description is required")
    .max(255, "Description must be less than 255 characters"),
  });