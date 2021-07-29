import React from 'react';
import { render } from 'react-dom';
import ThreadPageNew from '../../containers/ThreadPageNew';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThreadPageNew />,
    document.querySelector('#thread_new'),
  );
});
