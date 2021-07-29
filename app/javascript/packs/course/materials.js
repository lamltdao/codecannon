import React from 'react';
import { render } from 'react-dom';
import CourseMaterialsPage from '../../containers/CourseMaterialsPage';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <CourseMaterialsPage />,
    document.querySelector('#course_materials'),
  );
});
