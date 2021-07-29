import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import CourseNewFolderModal from './CourseNewFolderModal';
import CourseFileUploadModal from './CourseFileUploadModal';
import CourseConfigurationBar from '../CourseConfigurationBar';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const CourseFolderDialog = (props) => {
  const { enqueueSnackbar } = props;
  const { course, currentFolder, rootFolderId } = window.gon;
  const { id: currentFolderId, parent_folder_id: parentFolderId } = currentFolder;
  const { t } = useTranslation();
  const [modalFolderOpen, setModalFolderOpen] = useState(false);
  const [modalFileOpen, setModalFileOpen] = useState(false);

  const closeFolderModal = () => {
    setModalFolderOpen(false);
  };

  const openFolderModal = () => {
    setModalFolderOpen(true);
  };

  const closeFileModal = () => {
    setModalFileOpen(false);
  };

  const openFileModal = () => {
    setModalFileOpen(true);
  };

  const deleteFolder = (e) => {
    e.preventDefault();
    const url = `/courses/${course.id}/materials/${currentFolderId}`;
    const successRedirectUrl = `/courses/${course.id}/materials/${parentFolderId}`;
    axios({
      url,
      method: 'DELETE',
      headers: AxiosHeader,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Successfully deleted', 'success');
      window.location.href = successRedirectUrl;
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  const buttons = [{
    label: t('course.materials.newFolder'),
    onClick: openFolderModal,
  }, {
    label: t('course.materials.uploadFile'),
    onClick: openFileModal,
  }];

  if (currentFolderId !== rootFolderId) {
    buttons.push({
      label: t('course.materials.deleteFolder'),
      onClick: deleteFolder,
    });
  }

  return (
    <>
      <CourseConfigurationBar buttons={buttons} />
      <CourseNewFolderModal modalFolderOpen={modalFolderOpen} closeFolderModal={closeFolderModal} />
      <CourseFileUploadModal modalFileOpen={modalFileOpen} closeFileModal={closeFileModal} />
    </>
  );
};

CourseFolderDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(CourseFolderDialog);
