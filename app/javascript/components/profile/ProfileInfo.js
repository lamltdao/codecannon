import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';

const styles = (theme) => ({
  gridItem: {
    margin: theme.spacing(1),
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
  linkToEdit: {
    color: theme.palette.primary.contrastText,
  },
});

const ProfileInfo = (props) => {
  const { classes } = props;
  const { t } = useTranslation();
  const { user, isCurrentUser } = window.gon;
  const {
    fname, lname, username, email,
  } = user;
  const fullName = `${fname} ${lname}`;
  const profileInfo = [
    {
      title: t('profile.username'),
      value: username,
    },
    {
      title: 'Email',
      value: email,
    },
    {
      title: t('profile.nationality'),
      value: 'Vietnam',
    },
    {
      title: t('profile.birthyear'),
      value: '2002',
    },
    {
      title: t('profile.showProfile.institution'),
      value: 'HN-Ams',
    },
  ];

  return (
    <Grid
      container
      direction="column"
      spacing={0}
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.gridItem}>
        <Typography variant="h2" className={classes.typography}>
          {t('profile.showProfile.pageTitle')}
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="h3" className={classes.typography}>
          {fullName}
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Grid container direction="column" alignItems="flex-start">
          {profileInfo.map((field) => (
            <Grid item>
              <Typography variant="h4" className={classes.typography}>
                &gt;&nbsp;
                {field.title}
                :&nbsp;
                {field.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {
        isCurrentUser && (
          <Grid item>
            <Typography variant="h6">
              <Link href="/users/edit" className={classes.linkToEdit}>
                &gt;&gt;&nbsp;
                {t('profile.showProfile.linkToEdit')}
              </Link>
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
};

ProfileInfo.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ProfileInfo);
