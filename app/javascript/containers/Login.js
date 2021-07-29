import React from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import LoginForm from '../components/LoginForm';

const Login = () => (<AuthenticationLayout form={<LoginForm />} />);

export default Login;
