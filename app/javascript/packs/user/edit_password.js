import React from 'react';
import { render } from 'react-dom';
import EditPasswordPage from '../../containers/EditPasswordPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <EditPasswordPage />,
    document.querySelector('#edit-password'),
  );
});
