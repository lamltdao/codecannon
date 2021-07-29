import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import CourseCreated from '../components/admin/CourseCreated';

const AdminCourseCreated = () => (
  <AdminLayout
    rightComponentGroup={<CourseCreated />}
  />
);

export default AdminCourseCreated;
