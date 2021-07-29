import React from 'react';
import { render } from 'react-dom';
import AdminCourseCreated from '../../../containers/AdminCourseCreated';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AdminCourseCreated />,
    document.querySelector('#admin-portal'),
  );
});
