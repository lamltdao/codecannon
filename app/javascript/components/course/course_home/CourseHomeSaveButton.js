import React from 'react';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CodecannonButton from '../../common/CodecannonButton';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const CourseHomeSaveButton = (props) => {
  const { courseInfo, enqueueSnackbar } = props;
  const { t } = useTranslation();
  const handleSave = () => {
    const saveData = new FormData();
    saveData.append('course[welcome_message]', courseInfo.message);
    saveData.append('course[overview]', courseInfo.overview);

    const url = `/courses/${courseInfo.id}`;

    axios({
      url,
      method: 'PATCH',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data: saveData,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Save successfully', 'success');
      window.location.href = url;
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };
  return (
    <CodecannonButton
      onClick={handleSave}
      buttonSize="medium"
    >
      {t('course.home.save')}
    </CodecannonButton>
  );
};

CourseHomeSaveButton.propTypes = {
  courseInfo: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(CourseHomeSaveButton);
