import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import CodecannonTextField from '../common/CodecannonTextField';
import CodecannonButton from '../common/CodecannonButton';
import AxiosHeader from '../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../helpers/PushSnackbarMessage';
import { BORDER_LIGHT_GREY } from '../../shared/Constants';

const styles = (theme) => ({
  gridItem: {
    marginBottom: theme.spacing(1),
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
  textFieldContainer: {
    height: theme.spacing(10),
  },
  formRoot: {
    width: '90%',
  },
});

const ProfileInfo = (props) => {
  const { t } = useTranslation();
  const {
    classes, user, setUser, enqueueSnackbar,
  } = props;
  const {
    fname, lname, username,
  } = user;

  const editProfileInfo = [
    {
      title: t('profile.firstName'),
      value: fname,
      size: 6,
      name: 'fname',
    },
    {
      title: t('profile.lastName'),
      value: lname,
      size: 6,
      name: 'lname',
    },
    {
      title: t('profile.username'),
      value: username,
      size: 12,
      name: 'username',
      textFieldProps: {
        disabled: true,
      },
      paperStyles: {
        backgroundColor: `${BORDER_LIGHT_GREY}`,
      },
    },
    {
      title: t('profile.editProfile.currentPassword'),
      value: '',
      size: 12,
      name: 'current_password',
      textFieldProps: {
        type: 'password',
      },
    },
    {
      title: t('profile.editProfile.newPassword'),
      value: '',
      size: 6,
      name: 'password',
      textFieldProps: {
        type: 'password',
      },
    },
    {
      title: t('profile.editProfile.confirmNewPassword'),
      value: '',
      size: 6,
      name: 'password_confirmation',
      textFieldProps: {
        type: 'password',
      },
    },
  ];

  const handleTextFieldChange = (e, name) => {
    e.preventDefault();
    setUser((curUser) => (
      { ...curUser, [name]: e.target.value }
    ));
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(user).forEach((key) => (
      key !== 'username' && user[key] !== null && data.append(`user[${key}]`, user[key])
    ));
    const url = '/users';
    axios({
      url,
      method: 'PUT',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Successfully updated', 'success');
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  return (
    <Grid
      container
      direction="column"
      spacing={0}
      justify="center"
      alignItems="center"
    >
      <Grid container className={classes.formRoot}>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h2" className={classes.typography}>
            {t('profile.editProfile.pageTitle')}
          </Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container spacing={3} justify="flex-end">
            {editProfileInfo.map((field) => (
              <Grid item xs={field.size} className={classes.textFieldContainer} key={field.name}>
                <CodecannonTextField
                  {...field.textFieldProps}
                  paperStyles={{ ...field.paperStyles }}
                  placeholder={field.title}
                  onChange={(e) => handleTextFieldChange(e, field.name)}
                  defaultValue={field.value}
                />
              </Grid>
            ))}
            <Grid container direction="row" justify="space-between">
              <Grid item xs={3}>
                <CodecannonButton href={`/profile/${username}`} buttonSize="medium">
                  {t('profile.editProfile.backButton')}
                </CodecannonButton>
              </Grid>
              <Grid item xs={3}>
                <CodecannonButton onClick={updateProfile} buttonSize="medium" color="secondary">
                  {t('profile.editProfile.saveButton')}
                </CodecannonButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ProfileInfo.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  setUser: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(ProfileInfo));
