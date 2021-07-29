import React from 'react';
import { render } from 'react-dom';
import ThreadShowPage from '../../containers/ThreadShowPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThreadShowPage />,
    document.querySelector('#thread_show'),
  );
});
