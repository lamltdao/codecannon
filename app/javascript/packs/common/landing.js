import React from 'react';
import { render } from 'react-dom';
import WelcomePage from '../../containers/WelcomePage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <WelcomePage />,
    document.querySelector('#landing'),
  );
});
