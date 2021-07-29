import React from 'react';
import { render } from 'react-dom';
import AdminNewCourse from '../../../containers/AdminNewCourse';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AdminNewCourse />,
    document.querySelector('#admin-portal'),
  );
});
