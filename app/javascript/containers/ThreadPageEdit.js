import React from 'react';
import CourseLayout from '../layouts/CourseLayout';
import ThreadForm from '../components/course/discussion_threads/ThreadForm';

const ThreadPageEdit = () => (
  <CourseLayout selectedSection="threads">
    <ThreadForm />
  </CourseLayout>
);

export default ThreadPageEdit;
