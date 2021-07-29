import React from 'react';
import CourseMaterials from '../components/course/course_materials/CourseMaterials';
import CourseLayout from '../layouts/CourseLayout';
import CourseFolderDialog from '../components/course/course_materials/CourseFolderDialog';

const CourseMaterialsPage = () => {
  const { isMentor } = window.gon;
  return (
    <CourseLayout>
      <>
        {isMentor && <CourseFolderDialog />}
        <CourseMaterials />
      </>
    </CourseLayout>
  );
};

export default CourseMaterialsPage;
