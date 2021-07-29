import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';
import {
  FormControlLabel, Radio, ThemeProvider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowLeft } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CodecannonTextField from '../common/CodecannonTextField';
import CodecannonButton from '../common/CodecannonButton';
import DefaultCodecannonTheme from '../theme/DefaultCodecannonTheme';
import CourseSaveButton from './CourseSaveButton';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 6),
  },
  formGrid: {
    margin: theme.spacing(4, 0),
  },
  formComponent: {
    margin: theme.spacing(1.5, 0),
    padding: theme.spacing(0, 1),
    height: theme.spacing(8),
  },
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const NewCourseForm = (props) => {
  const { classes } = props;
  const { t } = useTranslation();

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    adminUsername: '',
  });
  const [language, setLanguage] = useState('en');
  const handleCourseChange = (field, value) => setCourseInfo(
    (prev) => ({ ...prev, [field]: value }),
  );

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography variant="h2">{t('admin.newCourseTitle')}</Typography>
      </Grid>
      <Grid container direction="column" className={classes.formGrid}>
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('admin.courseName')}
            value={courseInfo.name}
            onChange={(event) => handleCourseChange('name', event.target.value)}
          />
        </Grid>
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('admin.adminUsername')}
            value={courseInfo.adminUsername}
            onChange={(event) => handleCourseChange('adminUsername', event.target.value)}
          />
        </Grid>
        <Grid container alignItems="center" className={classes.formComponent}>
          <Grid item xs={4}>
            <Typography>{t('admin.courseLanguage')}</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={(
                <Radio
                  checked={language === 'en'}
                  onChange={(event) => setLanguage(event.target.value)}
                  value="en"
                />
              )}
              label={<Typography component="span">{t('admin.english')}</Typography>}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={(
                <Radio
                  checked={language === 'vn'}
                  onChange={(event) => setLanguage(event.target.value)}
                  value="vn"
                />
              )}
              label={<Typography component="span">{t('admin.vietnamese')}</Typography>}
            />
          </Grid>
        </Grid>
        <Grid container direction="row-reverse">
          <Grid item xs={6} className={classes.formComponent}>
            <CourseSaveButton
              courseInfo={courseInfo}
              language={language}
            />
          </Grid>
          <ThemeProvider theme={DefaultCodecannonTheme}>
            <Grid item xs={6} className={classes.formComponent}>
              <CodecannonButton href="/">
                <KeyboardArrowLeft className={classes.buttonLogo} />
                <span className={classes.buttonSpan}>{t('admin.back')}</span>
              </CodecannonButton>
            </Grid>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Grid>
  );
};

NewCourseForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withSnackbar(withStyles(styles)(NewCourseForm));
