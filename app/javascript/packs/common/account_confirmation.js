import React from 'react';
import { render } from 'react-dom';
import AccountConfirmationPage from '../../containers/AccountConfirmationPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AccountConfirmationPage />,
    document.querySelector('#account_confirmation'),
  );
});
