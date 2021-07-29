import React from 'react';
import { render } from 'react-dom';
import CourseHomePage from '../../containers/CourseHomePage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <CourseHomePage />,
    document.querySelector('#course_home'),
  );
});
