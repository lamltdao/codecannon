import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar, Grid, Button, Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    minHeight: '100%',
  },
  avatar: {
    maxWidth: '30vh',
    maxHeight: '30vh',
    width: '100%',
    height: '100%',
    aspectRatio: '1/1',
  },
  input: {
    display: 'none',
  },
  typography: {
    color: theme.palette.primary.contrastText,
  },
  avatarUploadButton: {
    '&:hover': {
      background: 'none',
    },
  },
});

const EditProfileAvatar = (props) => {
  const { classes, setUser } = props;
  const { t } = useTranslation();
  const [avatarUrl, setAvatarUrl] = useState(window.gon.user.avatar_url || '');
  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUser((curUser) => (
        { ...curUser, avatar: file }
      ));
      setAvatarUrl(reader.result);
    };
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      spacing={2}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Button component="label" disableRipple className={classes.avatarUploadButton}>
          <input
            accept="image/*"
            className={classes.input}
            multiple={false}
            type="file"
            onChange={onImageChange}
          />
          <Avatar alt="" src={avatarUrl} className={classes.avatar} />
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h6" className={classes.typography}>
          {t('profile.editProfile.uploadNewAvatar')}
        </Typography>
      </Grid>
    </Grid>
  );
};

EditProfileAvatar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditProfileAvatar);
