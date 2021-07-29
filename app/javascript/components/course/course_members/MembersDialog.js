import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseConfigurationBar from '../CourseConfigurationBar';
import CourseAddMemberModal from './CourseAddMemberModal';

const MembersDialog = () => {
  const { t } = useTranslation();
  const [modalAddMemberOpen, setModalAddMemberOpen] = useState(true);

  const closeAddMemberModal = () => {
    setModalAddMemberOpen(false);
  };

  const openNewMemberModal = () => {
    setModalAddMemberOpen(true);
  };

  const buttons = [{
    label: t('course.member.addMember'),
    onClick: openNewMemberModal,
  }];

  return (
    <>
      <CourseConfigurationBar buttons={buttons} />
      <CourseAddMemberModal
        modalAddMemberOpen={modalAddMemberOpen}
        closeAddMemberModal={closeAddMemberModal}
      />
    </>
  );
};

export default MembersDialog;
