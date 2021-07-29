import React from 'react';
import { render } from 'react-dom';
import EditProfilePage from '../../containers/EditProfilePage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <EditProfilePage />,
    document.querySelector('#edit-profile'),
  );
});
