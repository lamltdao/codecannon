import React from 'react';
import { render } from 'react-dom';
import ForgotPasswordPage from '../../containers/ForgotPasswordPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ForgotPasswordPage />,
    document.querySelector('#forgot_password'),
  );
});
