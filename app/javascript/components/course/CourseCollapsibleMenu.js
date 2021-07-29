import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles, useTheme } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import CourseSidebar from './CourseSidebar';

const styles = (theme) => ({
  menuIcon: {
    color: 'white',
  },
  drawerTitle: {
    padding: theme.spacing(2, 2.5),
    textAlign: 'right',
  },
  dividerHorizontal: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: 'white',
  },
});

const CourseCollapsibleMenu = (props) => {
  const { classes } = props;
  const { course, isMentor } = window.gon;
  const { t } = useTranslation();
  const [anchor, setAnchor] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <IconButton onClick={() => setAnchor(!anchor)}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={anchor}
        onClose={() => setAnchor(false)}
        onOpen={() => setAnchor(true)}
      >
        <Grid className={classes.drawerTitle}>
          <Typography variant="h6" className={isSmallScreen ? '' : classes.title}>
            {`${isMentor ? t('course.navbar.manage') : ''}`}
            {`${course.name}`}
          </Typography>
        </Grid>
        <Divider className={classes.dividerHorizontal} />
        <CourseSidebar />
        <Divider />
        <Grid className={classes.drawerTitle}>
          <Typography variant="h6">
            <Link href="/">
              {`<< ${t('course.navbar.siteHome')}`}
            </Link>
          </Typography>
        </Grid>
      </SwipeableDrawer>
    </>
  );
};

CourseCollapsibleMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseCollapsibleMenu);
