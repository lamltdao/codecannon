import React from 'react';
import ForgotPassword from '../components/ForgotPassword';
import LandingPageLayout from '../layouts/LandingPageLayout';
import Logo from '../components/Logo';

const ForgotPasswordPage = () => (
  <LandingPageLayout
    leftComponentGroup={<Logo />}
    rightComponentGroup={<ForgotPassword />}
  />
);

export default ForgotPasswordPage;
