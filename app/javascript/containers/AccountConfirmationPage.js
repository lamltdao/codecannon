import React from 'react';
import AccountConfirmation from '../components/AccountConfirmation';
import LandingPageLayout from '../layouts/LandingPageLayout';
import Logo from '../components/Logo';

const AccountConfirmationPage = () => (
  <LandingPageLayout
    leftComponentGroup={<Logo />}
    rightComponentGroup={<AccountConfirmation />}
  />
);

export default AccountConfirmationPage;
