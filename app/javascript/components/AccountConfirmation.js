import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CodecannonTextField from './common/CodecannonTextField';
import CodecannonButton from './common/CodecannonButton';
import AxiosHeader from '../helpers/AxiosHeader';
import PushSnackbarMessage from '../helpers/PushSnackbarMessage';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 6),
  },
});

const AccountConfirmation = (props) => {
  const [curEmail, setCurEmail] = useState('');
  const { classes, enqueueSnackbar } = props;
  const { t } = useTranslation();
  const handleTextfieldChange = (e) => {
    e.preventDefault();
    setCurEmail(e.target.value);
  };
  const handleButtonSubmit = () => {
    const data = new FormData();
    data.append('unconfirmed_email', curEmail);
    const url = '/users/confirmation';

    axios({
      url,
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Email successfully resent', 'success');
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };
  return (
    <Grid container spacing={3} direction="column" className={classes.root}>
      <Grid item>
        <Typography variant="h4">{t('email.account_confirmation.msg')}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">{t('email.account_confirmation.resend_reminder')}</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={3} justify="center">
          <Grid item xs={9}>
            <CodecannonTextField
              placeholder={t('email.textfieldPlaceholder')}
              onChange={handleTextfieldChange}
            />
          </Grid>
          <Grid item xs={3}>
            <CodecannonButton
              onClick={handleButtonSubmit}
            >
              {t('email.buttonPlaceholder')}
            </CodecannonButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AccountConfirmation.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(AccountConfirmation));
