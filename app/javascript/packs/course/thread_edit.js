import React from 'react';
import { render } from 'react-dom';
import ThreadPageEdit from '../../containers/ThreadPageEdit';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <ThreadPageEdit />,
    document.querySelector('#thread_edit'),
  );
});
