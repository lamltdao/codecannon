import React from 'react';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CodecannonButton from '../../common/CodecannonButton';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const ThreadSaveButton = (props) => {
  const { threadInfo, enqueueSnackbar } = props;
  const { threadIsEdit } = threadInfo;
  const { t } = useTranslation();
  const handleSave = () => {
    const saveData = new FormData();
    saveData.append('discussion_thread[title]', threadInfo.title);
    saveData.append('discussion_thread[body]', threadInfo.content);
    const url = threadIsEdit ? (`/courses/${threadInfo.courseId}/threads/${threadInfo.threadId}`) : (`/courses/${threadInfo.courseId}/threads`);
    axios({
      url,
      method: threadIsEdit ? 'PATCH' : 'POST',
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
      {t('course.threads.save')}
    </CodecannonButton>
  );
};

ThreadSaveButton.propTypes = {
  threadInfo: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(ThreadSaveButton);
