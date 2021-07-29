import React from 'react';
import CourseLayout from '../layouts/CourseLayout';
import CourseMembersTable from '../components/course/course_members/CourseMembersTables';

const CourseMembers = () => (
  <CourseLayout>
    <CourseMembersTable />
  </CourseLayout>
);

export default CourseMembers;
