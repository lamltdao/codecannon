import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  CheckBoxOutlineBlankOutlined, CheckBoxOutlined, KeyboardArrowRight,
  Visibility, VisibilityOff,
} from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import { IconButton, InputAdornment } from '@material-ui/core';
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
  checkboxGrid: {
    textAlign: 'start',
    paddingLeft: theme.spacing(2),
  },
  checkboxLabel: {
    fontSize: '1.2rem',
    color: 'white',
    marginLeft: theme.spacing(1),
  },
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const OutlinedCheckbox = withStyles({
  root: {
    color: 'white',
    fontSize: '2rem',
  },
})((props) => <CheckBoxOutlineBlankOutlined {...props} />);

const CheckedCheckbox = withStyles({
  root: {
    fontSize: '2rem',
  },
})((props) => <CheckBoxOutlined {...props} />);

const LoginForm = (props) => {
  const { classes, enqueueSnackbar } = props;
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const InputEndAdornment = () => (
    <InputAdornment>
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/users/login',
      method: 'POST',
      headers: AxiosHeader,
      data: new FormData(e.target),
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, t('authentication.loginSuccessMsg'), 'success');
      window.location.href = '/';
    }).catch(() => {
      PushSnackbarMessage(enqueueSnackbar, t('authentication.loginFailedAlert'), 'error');
    });
  };

  return (
    <Grid container direction="column" className={classes.form}>
      <Grid item>
        <Typography className={classes.title}>
          {t('common.login')}
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('authentication.login')}
            name="user[login]"
          />
        </Grid>
        <Grid item className={classes.formComponent}>
          <CodecannonTextField
            placeholder={t('authentication.password')}
            type={showPassword ? 'text' : 'password'}
            endAdornment={<InputEndAdornment />}
            name="user[password]"
          />
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={6} className={classes.checkboxGrid}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  name="user[remember_me]"
                  icon={<OutlinedCheckbox />}
                  checkedIcon={<CheckedCheckbox />}
                  disableRipple
                />
              )}
              label={t('authentication.remember')}
              classes={{
                label: classes.checkboxLabel,
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.formComponent}>
            <CodecannonButton color="secondary" type="submit">
              <span className={classes.buttonSpan}>{t('authentication.submit')}</span>
              <KeyboardArrowRight className={classes.buttonLogo} />
            </CodecannonButton>
          </Grid>
        </Grid>
      </form>
      <Grid item className={classes.formComponent}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">
              <Link
                href="/forgot_password"
                color="secondary"
              >
                {t('authentication.resetPasswordRedir')}
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {t('authentication.signUpRedir')}
              <Link
                href="/users/sign_up"
                color="secondary"
              >
                {t('authentication.here')}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(LoginForm));
