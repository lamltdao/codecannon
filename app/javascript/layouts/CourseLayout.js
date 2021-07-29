import React from 'react';
import { withStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CourseSidebar from '../components/course/CourseSidebar';
import CourseNavBar from '../components/course/CourseNavBar';
import DefaultCodecannonTheme from '../components/theme/DefaultCodecannonTheme';
import InvertedCodecannonTheme from '../components/theme/InvertedCodecannonTheme';

const styles = (theme) => ({
  root: {
    height: '100%',
    marginTop: theme.spacing(12),
  },
  grid: {
    textAlign: 'right',
  },
});

const CourseLayout = (props) => {
  const { classes, children } = props;
  const { isMentor } = window.gon;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={isMentor ? InvertedCodecannonTheme : DefaultCodecannonTheme}>
      <SnackbarProvider maxSnack={1}>
        <>
          <CourseNavBar />
          <Grid container direction="row" alignContent="center" alignItems="stretch" className={classes.root}>
            {isSmallScreen ? <></> : (
              <Grid item xs={2} className={classes.grid}>
                <CourseSidebar />
              </Grid>
            )}
            <Grid item xs={12} lg={10}>
              {children}
            </Grid>
          </Grid>
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

CourseLayout.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(CourseLayout);
