import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardArrowRight,
} from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import CodecannonButton from './common/CodecannonButton';
import AxiosHeader from '../helpers/AxiosHeader';
import PushSnackbarMessage from '../helpers/PushSnackbarMessage';
import CodecannonTextField from './common/CodecannonTextField';

const styles = (theme) => ({
  title: {
    fontSize: '5rem',
    color: '#fff',
  },
  form: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
  },
  formComponent: {
    margin: theme.spacing(2, 0),
    height: theme.spacing(8),
  },
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const EditPasswordForm = (props) => {
  const { classes, enqueueSnackbar } = props;
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const resetPasswordToken = urlParams.get('reset_password_token');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = '/users/password';
    axios({
      url,
      method: 'PUT',
      headers: AxiosHeader,
      data: new FormData(e.target),
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, t('authentication.editPasswordSuccessMsg'), 'success');
      window.location.href = '/users/login';
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  return (
    <Grid container direction="column" className={classes.form}>
      <Grid item>
        <Typography className={classes.title}>
          {t('common.editPassword')}
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <input readOnly hidden name="user[reset_password_token]" value={resetPasswordToken} />
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('authentication.newPassword')}
            type="password"
            name="user[password]"
          />
        </Grid>
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('authentication.confirmNewPassword')}
            type="password"
            name="user[password_confirmation]"
          />
        </Grid>
        <Grid item className={classes.formComponent}>
          <Grid container direction="row-reverse">
            <Grid item xs={6}>
              <CodecannonButton color="secondary" type="submit">
                <span className={classes.buttonSpan}>{t('authentication.submit')}</span>
                <KeyboardArrowRight className={classes.buttonLogo} />
              </CodecannonButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

EditPasswordForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(EditPasswordForm));
