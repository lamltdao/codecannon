import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import NewCourseForm from '../components/admin/NewCourseForm';

const AdminNewCourse = () => (
  <AdminLayout
    rightComponentGroup={<NewCourseForm />}
  />
);

export default AdminNewCourse;
