import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider } from 'notistack';
import Logo from '../components/Logo';
import DefaultCodecannonTheme from '../components/theme/DefaultCodecannonTheme';
import LanguagesBar from '../components/common/LanguagesBar';

const styles = () => ({
  root: {
    height: '100%',
  },
  leftComponentGrid: {
    textAlign: 'center',
    height: '50vh',
  },
  grid: {
    textAlign: 'center',
  },
});

const AuthenticationLayout = (props) => {
  const { classes, form } = props;
  return (
    <ThemeProvider theme={DefaultCodecannonTheme}>
      <SnackbarProvider maxSnack={1}>
        <Grid container alignContent="center" alignItems="center" className={classes.root}>
          <Grid item xs={12} lg={6} className={classes.leftComponentGrid}>
            <Logo />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.grid}>
            <Grid container alignItems="center" alignContent="center" className={classes.root}>
              <Grid item xs={12} className={classes.grid}>
                {form}
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <LanguagesBar />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

AuthenticationLayout.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(AuthenticationLayout);
