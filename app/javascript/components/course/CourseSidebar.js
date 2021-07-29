import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { COURSE_SIDEBAR_OPTIONS, BORDER_LIGHT_GREY } from '../../shared/Constants';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
    borderRight: `solid ${BORDER_LIGHT_GREY} 1px`,
    height: '100%',
  },
  gridItem: {
    width: '100%',
    textAlign: 'right',
  },
  navigationLink: {
    marginBottom: theme.spacing(3.5),
  },
});

const CourseSidebar = (props) => {
  const { classes } = props;
  const { course, isMentor, rootFolderId } = window.gon;
  const { t } = useTranslation();

  const isSelectedSection = (key) => (
    COURSE_SIDEBAR_OPTIONS[key].pathnameRegex.test(window.location.pathname)
  );

  const sectionLinkColor = (key) => (
    isSelectedSection(key) ? 'primary' : 'textPrimary'
  );

  const sectionLink = (link, key) => (
    <Typography variant="h6" className={classes.navigationLink}>
      <Link href={link} color={sectionLinkColor(key)}>
        {t(`course.sidebar.${key}`)}
      </Link>
    </Typography>
  );

  return (
    <Grid container direction="column" alignContent="center" className={classes.root}>
      {
        Object.keys(COURSE_SIDEBAR_OPTIONS).map((key) => {
          const section = COURSE_SIDEBAR_OPTIONS[key];
          const nestedPath = section.url(rootFolderId);
          const accessible = isMentor || section.studentAccessible;
          return (
            accessible && (
              <Grid item key={key} className={classes.gridItem}>
                {sectionLink(`/courses/${course.id}/${nestedPath}`, key)}
              </Grid>
            )
          );
        })
      }
    </Grid>
  );
};

CourseSidebar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseSidebar);
