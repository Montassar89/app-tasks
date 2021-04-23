import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setToken }) {
  const { register, formState: { errors } , handleSubmit } = useForm();
  const onSubmit = (data) => {
    if(data.email === "test@test.com" && data.password === "test"){
      setToken("test2021");
      localStorage.setItem('user', JSON.stringify(data.email));
    }
    else{
      toast.error(`Les données fournies n'étaient pas valides!`);
    }
  };

  return(
    <div className="w-50 mx-auto mt-5">
      <ToastContainer />
      <h1>Se connecter</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email"
         id="exampleEmail" placeholder=""
         {...register('email', {
          required: 'This is a required',
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })} />
        <div className="text-danger">{errors.email && errors.email.message}</div>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" 
         {...register('password', {
          required: 'This is a required',
        })}
        name="password" id="examplePassword" placeholder="" />
        <div className="text-danger">{errors.password && errors.password.message}</div>
      </FormGroup>
      <Button type="submit">Envoyer</Button>
    </Form>
    </div>
  )
}

