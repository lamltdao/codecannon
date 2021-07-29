import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider } from 'notistack';
import Logo from '../components/Logo';
import AdminTheme from '../components/theme/AdminTheme';
import LanguagesBar from '../components/common/LanguagesBar';

const styles = () => ({
  root: {
    height: '100%',
  },
  leftComp: {
    height: '50vh',
    textAlign: 'center',
  },
  grid: {
    textAlign: 'center',
  },
});

const AdminLayout = (props) => {
  const { classes, rightComponentGroup } = props;
  return (
    <ThemeProvider theme={AdminTheme}>
      <SnackbarProvider maxSnack={1}>
        <Grid container alignItems="center" alignContent="center" className={classes.root}>
          <Grid item xs={12} lg={6} className={classes.leftComp}>
            <Logo />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.grid}>
            <Grid container alignItems="center" alignContent="center" className={classes.root}>
              <Grid item xs={12} className={classes.grid}>
                {rightComponentGroup}
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

AdminLayout.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  rightComponentGroup: PropTypes.element.isRequired,
};

export default withStyles(styles)(AdminLayout);
