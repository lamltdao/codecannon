import React from 'react';
import { render } from 'react-dom';
import ThreadsPage from '../../containers/ThreadsPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThreadsPage />,
    document.querySelector('#threads'),
  );
});
