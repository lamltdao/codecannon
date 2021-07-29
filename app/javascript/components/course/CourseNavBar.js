import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, useTheme } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PersonalSettingsMenu from './PersonalSettingsMenu';
import CourseCollapsibleMenu from './CourseCollapsibleMenu';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  backHome: {
    padding: 0,
  },
  divider: {
    height: theme.spacing(6),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'white',
  },
});

const CourseNavBar = (props) => {
  const { classes } = props;
  const { course, isMentor } = window.gon;
  const { t } = useTranslation();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="row" className={classes.root}>
      <AppBar>
        <Toolbar>
          <Grid item xs={2} lg={7}>
            {
              isSmallScreen ? <CourseCollapsibleMenu /> : (
                <Grid container alignItems="center" spacing={2}>
                  <Button href="/home" className={classes.backHome} disableRipple>
                    <Avatar src="https://w7.pngwing.com/pngs/180/912/png-transparent-logo-falcon-animals-company-text-thumbnail.png" />
                    <Typography className={classes.title} variant="h6">&nbsp;codecannon.net</Typography>
                  </Button>
                  <Grid item>
                    <Divider orientation="vertical" className={classes.divider} flexItem />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" className={isSmallScreen ? '' : classes.title}>
                      {`${isMentor ? t('course.navbar.manage') : ''}`}
                      {`${course.name}`}
                    </Typography>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
          <Grid item xs={10} lg={5}>
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <PersonalSettingsMenu />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

CourseNavBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseNavBar);
