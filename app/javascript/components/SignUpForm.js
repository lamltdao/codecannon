import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import _isNull from 'lodash/isNull';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff, KeyboardArrowRight } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import Parser from 'html-react-parser';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import AxiosHeader from '../helpers/AxiosHeader';
import PushSnackbarMessage from '../helpers/PushSnackbarMessage';
import CodecannonButton from './common/CodecannonButton';
import CodecannonTextField from './common/CodecannonTextField';
import { RECAPTCHA_BOX_HEIGHT } from '../shared/Constants';

const styles = (theme) => ({
  title: {
    fontSize: '5rem',
    color: '#fff',
  },
  formGrid: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%',
  },
  formComponent: {
    margin: theme.spacing(1.5, 0),
    padding: theme.spacing(0, 1),
    height: theme.spacing(8),
  },
  captchaGrid: {
    margin: theme.spacing(2, 0),
    height: RECAPTCHA_BOX_HEIGHT,
    paddingLeft: theme.spacing(2),
  },
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const SignUpForm = (props) => {
  const { classes, enqueueSnackbar } = props;
  const [showPassword, setShowPassword] = useState(false);
  const originalForm = document.getElementById('signup-form');
  const childNodes = originalForm.innerHTML;
  const { recaptchaSiteKey } = window.gon;
  const { t } = useTranslation();

  const [recaptcha, setRecaptcha] = useState(null);
  const handleSubmitRecaptcha = (value) => setRecaptcha(value);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/users',
      method: 'POST',
      headers: AxiosHeader,
      data: new FormData(e.target),
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, t('authentication.signUpSuccessMsg'), 'success');
      window.location.href = '/account_confirmation';
    }).catch(({ response }) => {
      response.data.errors.forEach((error) => {
        PushSnackbarMessage(enqueueSnackbar, error, 'error');
      });
    });
  };

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
  return (
    <Grid container direction="row" className={classes.formGrid}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.title}>{t('common.signUp')}</Typography>
      </Grid>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container>
          {Parser(childNodes)}
          <Grid item xs={12} className={classes.formComponent}>
            <CodecannonTextField
              placeholder={t('authentication.username')}
              name="user[username]"
            />
          </Grid>
          <Grid item xs={12} className={classes.formComponent}>
            <CodecannonTextField
              placeholder="E-mail"
              name="user[email]"
            />
          </Grid>
          <Grid item xs={6} className={classes.formComponent}>
            <CodecannonTextField
              placeholder={t('authentication.password')}
              type={showPassword ? 'text' : 'password'}
              endAdornment={<InputEndAdornment />}
              name="user[password]"
            />
          </Grid>
          <Grid item xs={6} className={classes.formComponent}>
            <CodecannonTextField
              placeholder={t('authentication.passCfm')}
              type={showPassword ? 'text' : 'password'}
              endAdornment={<InputEndAdornment />}
              name="user[password_confirmation]"
            />
          </Grid>
          <Grid item xs={7} className={classes.captchaGrid}>
            <ReCAPTCHA
              size="normal"
              ref={useRef()}
              sitekey={recaptchaSiteKey}
              onChange={handleSubmitRecaptcha}
            />
          </Grid>
          <Grid item xs={5} className={classes.captchaGrid}>
            <CodecannonButton
              color="secondary"
              variant="contained"
              type="submit"
              disabled={_isNull(recaptcha)}
            >
              <span className={classes.buttonSpan}>{t('authentication.submit')}</span>
              <KeyboardArrowRight className={classes.buttonLogo} />
            </CodecannonButton>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12} className={classes.formComponent}>
        <Typography variant="h6">
          {t('authentication.loginRedir')}
          <Link href="/users/login" color="secondary">{t('authentication.here')}</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

SignUpForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(SignUpForm));
