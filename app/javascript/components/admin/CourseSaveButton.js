import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowRight } from '@material-ui/icons';
import CodecannonButton from '../common/CodecannonButton';
import AxiosHeader from '../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../helpers/PushSnackbarMessage';
import EN_TRANS from '../../translate/en/translations';
import VN_TRANS from '../../translate/vn/translations';

const styles = () => ({
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const CourseSaveButton = (props) => {
  const {
    classes, enqueueSnackbar, courseInfo, language,
  } = props;
  const { t } = useTranslation();

  const handleSubmit = () => {
    const data = new FormData();
    data.append('course[name]', courseInfo.name);
    data.append('admin_username', courseInfo.adminUsername);
    if (language === 'en') {
      data.append('course[welcome_message]', EN_TRANS.course.defaultWelcomeMsg(courseInfo.name));
      data.append('course[overview]', EN_TRANS.course.defaultOverview);
    } else if (language === 'vn') {
      data.append('course[welcome_message]', VN_TRANS.course.defaultWelcomeMsg(courseInfo.name));
      data.append('course[overview]', VN_TRANS.course.defaultOverview);
    }
    axios({
      url: '/admin/courses',
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(({ data: { courseId } }) => {
      PushSnackbarMessage(enqueueSnackbar, 'Create course successfully!', 'success');
      const redirectUrl = `/admin/course_created/${courseId}`;
      window.location.href = redirectUrl;
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };
  return (
    <CodecannonButton color="secondary" onClick={handleSubmit}>
      <span className={classes.buttonSpan}>{t('admin.submit')}</span>
      <KeyboardArrowRight className={classes.buttonLogo} />
    </CodecannonButton>
  );
};

CourseSaveButton.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  courseInfo: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default withSnackbar(withStyles(styles)(CourseSaveButton));
