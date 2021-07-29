import React from 'react';
import CourseLayout from '../layouts/CourseLayout';
import ThreadForm from '../components/course/discussion_threads/ThreadForm';

const ThreadPageNew = () => (
  <CourseLayout selectedSection="threads">
    <ThreadForm />
  </CourseLayout>
);

export default ThreadPageNew;
