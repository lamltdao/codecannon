import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Grid } from '@material-ui/core';

const styles = () => ({
  root: {
    minHeight: '100vh',
  },
  avatar: {
    width: '30vh',
    height: '30vh',
  },
});

const ProfileAvatar = (props) => {
  const { classes } = props;
  const { user } = window.gon;
  const avatarUrl = user.avatar_url ? user.avatar_url : '';
  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      spacing={0}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Avatar src={avatarUrl} className={classes.avatar} />
      </Grid>
    </Grid>
  );
};

ProfileAvatar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ProfileAvatar);
