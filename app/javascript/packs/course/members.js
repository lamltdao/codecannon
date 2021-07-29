import React from 'react';
import { render } from 'react-dom';
import CourseMembers from '../../containers/CourseMembers';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <CourseMembers />,
    document.querySelector('#members'),
  );
});
