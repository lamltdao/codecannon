import React from 'react';
import Welcome from '../components/Welcome';
import LandingPageLayout from '../layouts/LandingPageLayout';
import Logo from '../components/Logo';

const WelcomePage = () => (
  <LandingPageLayout
    leftComponentGroup={<Logo />}
    rightComponentGroup={<Welcome />}
  />
);

export default WelcomePage;
