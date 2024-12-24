import  Axios  from 'axios';
import  {loginSchema} from '../../Schema/Schema'
import { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container , Title } from '../../component/index'
import { Button, Input, Error } from '../../component/index'
import { Link } from 'react-router-dom'



const api = process.env.REACT_APP_API_AUTH;
function Login() {
  const [responseMessage, setResponseMessage] = useState("");
  const [, setCookies] = useCookies("access_token")
  const navigate = useNavigate();
  
  const { register , handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(`${api}/login`,{...data});
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.user._id);
      window.localStorage.setItem("firstname", response.data.user.firstname);
      window.localStorage.setItem("lastname", response.data.user.lastname);
      window.localStorage.setItem("loggedIn", true );
      navigate('/home' , { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "An unexpected error occurred.";
      setResponseMessage(errorMsg);
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  
  return (
    <>
      <Container>
        <Title>Login</Title>
        <form className="flex flex-col items-center  gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Error 
          error={responseMessage}
        />
        <Button 
          title= "Login" 
          variant="primary"
          classname={"rounded p-2"}
        />
        <Link to='/register' className="text-gray-100 underline">Sign up</Link>
      </form>
      </Container>
    </>
  )
}

export default Login
