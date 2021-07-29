import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider } from 'notistack';
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

const LandingPageLayout = (props) => {
  const { classes, leftComponentGroup, rightComponentGroup } = props;
  return (
    <ThemeProvider theme={DefaultCodecannonTheme}>
      <SnackbarProvider maxSnack={1}>
        <Grid container alignItems="center" alignContent="center" className={classes.root}>
          <Grid item xs={12} lg={6} className={classes.leftComponentGrid}>
            {leftComponentGroup}
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

LandingPageLayout.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  leftComponentGroup: PropTypes.element.isRequired,
  rightComponentGroup: PropTypes.element.isRequired,
};

export default withStyles(styles)(LandingPageLayout);
