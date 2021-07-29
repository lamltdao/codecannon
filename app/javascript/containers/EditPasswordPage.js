import React from 'react';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import EditPasswordForm from '../components/EditPasswordForm';

const EditPasswordPage = () => (<AuthenticationLayout form={<EditPasswordForm />} />);

export default EditPasswordPage;
