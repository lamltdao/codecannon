import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import CodecannonTextField from '../../common/CodecannonTextField';
import CodecannonButton from '../../common/CodecannonButton';
import ThreadSaveButton from './ThreadSaveButton';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  grid: {
    padding: theme.spacing(1),
    height: theme.spacing(10),
  },
  gridContent: {
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

const ThreadForm = (props) => {
  const { classes } = props;
  const { course, thread, isEdit } = window.gon;
  const { t } = useTranslation();
  const [threadInfo, setThreadInfo] = useState({
    title: thread.title,
    content: thread.body,
    courseId: course.id,
    threadId: thread.id,
    threadIsEdit: isEdit,
  });

  const handleThreadChange = (field, value) => setThreadInfo(
    (prev) => ({ ...prev, [field]: value }),
  );
  const changesMade = () => (
    thread.title !== threadInfo.title || thread.body !== threadInfo.content
  );
  const handleCancel = () => {
    if (!changesMade() || window.confirm(t('course.threads.confirmCancel'))) {
      window.location.href = isEdit ? (`/courses/${course.id}/threads/${thread.id}`) : (`/courses/${course.id}/threads`);
    }
  };
  return (
    <Grid container className={classes.root} alignItems="baseline">
      <Grid item xs={12} className={classes.grid}>
        <Typography variant="h3">
          {isEdit ? t('course.threads.edit.editThreadTitle') + thread.title : t('course.threads.new.newPageTitle')}
        </Typography>
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography className={classes.label}>{t('course.threads.threadTitle')}</Typography>
      </Grid>
      <Grid item xs={9} className={classes.grid}>
        <CodecannonTextField
          placeholder={t('course.threads.threadTitleHelpText')}
          withBorder
          value={threadInfo.title}
          onChange={(event) => handleThreadChange('title', event.target.value)}
        />
      </Grid>
      <Grid item xs={3} className={classes.grid}>
        <Typography className={classes.label}>{t('course.threads.threadContent')}</Typography>
      </Grid>
      <Grid item xs={9} className={classes.gridContent}>
        <CodecannonTextField
          placeholder={t('course.threads.threadContentHelpText')}
          withBorder
          multiline
          value={threadInfo.content}
          rows={15}
          onChange={(event) => handleThreadChange('content', event.target.value)}
        />
      </Grid>
      <Grid container justify="flex-end">
        <Grid item xs={2} className={classes.gridButtons}>
          <CodecannonButton
            buttonSize="medium"
            onClick={handleCancel}
            variant="outlined"
          >
            {t('course.threads.cancel')}
          </CodecannonButton>
        </Grid>
        <Grid item xs={2} className={classes.gridButtons}>
          <ThreadSaveButton threadInfo={threadInfo} />
        </Grid>
      </Grid>
    </Grid>
  );
};

ThreadForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ThreadForm);
