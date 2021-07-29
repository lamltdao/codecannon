import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import CodecannonTextField from '../../common/CodecannonTextField';
import CodecannonButton from '../../common/CodecannonButton';
import CourseHomeSaveButton from './CourseHomeSaveButton';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  grid: {
    padding: theme.spacing(1),
    height: theme.spacing(10),
  },
  gridOverview: {
    padding: theme.spacing(1),
    height: `calc(24em + ${theme.spacing(10)}px)`,
  },
  gridButtons: {
    padding: theme.spacing(1),
  },
  label: {
    textAlign: 'end',
    fontSize: '1.2rem',
  },
});

const CourseHomeEditForm = (props) => {
  const { classes } = props;
  const {
    welcome_message: message, overview, id, name,
  } = window.gon.course;
  const { t } = useTranslation();
  const [courseInfo, setCourseInfo] = useState({ message, overview, id });
  const handleCourseChange = (field, value) => setCourseInfo(
    (prev) => ({ ...prev, [field]: value }),
  );
  const changesMade = () => (message !== courseInfo.message || overview !== courseInfo.overview);
  const handleCancel = () => {
    if (!changesMade() || window.confirm(t('course.home.confirmCancel'))) {
      window.location.href = `/courses/${id}`;
    }
  };
  return (
    <Grid container className={classes.root} alignItems="baseline">
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h3">
          {t('course.home.editPageTitle')}
        </Typography>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography className={classes.label}>
          {t('course.home.courseName')}
        </Typography>
      </Grid>

      <Grid item xs={9} className={classes.grid}>
        <CodecannonTextField
          placeholder={t('course.home.courseTitle')}
          withBorder
          value={name}
          disabled
        />
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography className={classes.label}>{t('course.home.welcomeTitle')}</Typography>
      </Grid>
      <Grid item xs={9} className={classes.grid}>
        <CodecannonTextField
          placeholder={t('course.home.welcomeHelpText')}
          withBorder
          value={courseInfo.message}
          onChange={(event) => handleCourseChange('message', event.target.value)}
        />
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography className={classes.label}>{t('course.home.ovrTitle')}</Typography>
      </Grid>
      <Grid item xs={9} className={classes.gridOverview}>
        <CodecannonTextField
          placeholder={t('course.home.ovrHelpText')}
          withBorder
          multiline
          value={courseInfo.overview}
          rows={15}
          onChange={(event) => handleCourseChange('overview', event.target.value)}
        />
      </Grid>
      <Grid container justify="flex-end">
        <Grid item xs={2} className={classes.gridButtons}>
          <CodecannonButton
            buttonSize="medium"
            onClick={handleCancel}
            variant="outlined"
          >
            {t('course.home.cancel')}
          </CodecannonButton>
        </Grid>
        <Grid item xs={2} className={classes.gridButtons}>
          <CourseHomeSaveButton courseInfo={courseInfo} />
        </Grid>
      </Grid>
    </Grid>
  );
};

CourseHomeEditForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseHomeEditForm);
