import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../../Schema/Schema'
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Title } from '../../component/index';
import { Button, Input, Error } from '../../component/index';
import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_AUTH;
const Register = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  

  const {register, handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      age: null,
      email: '',
      password: '',
      confirmPassword: '',
      createdOn: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(`${api}/signup`, {
        ...data,
        createdOn: new Date(),
      });

      console.log(response.data.message);
      setCookies('access_token', response.data.token);
      window.localStorage.setItem("userID", response.data.user._id);
      window.localStorage.setItem("firstname", response.data.user.firstname);
      window.localStorage.setItem("lastname", response.data.user.lastname);
      window.localStorage.setItem('loggedIn', true);
      navigate('/home', { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "An unexpected error occurred.";
      setResponseMessage(errorMsg);
      console.error("Sign-up error:", err.response?.data || err.message);
    }
  };

  return (
    <Container>
      <Title>Create a new account</Title>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="firstname"
        placeholder="First name"
        register={{...register("firstname")}}
        error={errors.firstname?.message}
        classname="rounded"
        {...register("firstname")}
      />
      <Input
        name="lastname"
        placeholder="Last name"
        register={{...register("lastname")}}
        error={errors.lastname?.message}
        classname="rounded"
        {...register("lastname")}
      />
      <Input
        name="username"
        placeholder="Username"
        register={{...register("username")}}
        error={errors.username?.message}
        classname="rounded"
        {...register("username")}
      />
      <Input
        name="age"
        type="number"
        placeholder="Age"
        register={{...register("age")}}
        error={errors.age?.message}
        classname="rounded"
        {...register("age")}
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        register={{...register("email")}}
        error={errors.email?.message}
        classname="rounded"
        {...register("email")}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        register={{...register("password")}}
        error={errors.password?.message}
        classname="rounded"
        {...register("password")}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm Password"
        register={{...register("confirmPassword")}}
        error={errors.confirmPassword?.message}
        classname="rounded"
        {...register("confirmPassword")}
      />
      <Error 
        error={responseMessage}
      />
      <Button 
          title= "Sign up" 
          variant="primary"
          classname={"rounded p-2"}
        />
      <Link to="/" className="text-gray-100 underline">
        Already have an account?
      </Link>
    </form>
    </Container>
  );
};

export default Register;
