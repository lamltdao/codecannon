import React from 'react';
import { render } from 'react-dom';
import ShowProfilePage from '../../containers/ShowProfilePage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ShowProfilePage />,
    document.querySelector('#show-profile'),
  );
});
