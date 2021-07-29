import React from 'react';
import { render } from 'react-dom';
import HomePage from '../../containers/HomePage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <HomePage />,
    document.querySelector('#home'),
  );
});
