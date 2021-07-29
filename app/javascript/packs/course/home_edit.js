import React from 'react';
import { render } from 'react-dom';
import CourseHomePageEdit from '../../containers/CourseHomePageEdit';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <CourseHomePageEdit />,
    document.querySelector('#course_home_edit'),
  );
});
