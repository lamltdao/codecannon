import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  root: {
    height: '100%',
  },
  listGrid: {
    textAlign: 'left',
  },
  singleList: {
    padding: theme.spacing(4, 0),
  },
  typography: {
    color: '#fff',
  },
  gridLink: {
    width: 'fit-content',
  },
});

const Section = (props) => {
  const { coursesList, classes } = props;
  const { adminCourses, participatingCourses } = coursesList;
  const { t } = useTranslation();

  const courseList = (courses, title) => (
    <Grid container direction="column" spacing={2} className={classes.singleList}>
      <Grid item>
        <Typography variant="h4" className={classes.typography}>
          {title}
        </Typography>
      </Grid>
      {
        courses.length === 0
          ? (
            <Grid item>
              <Typography variant="h6" className={classes.typography}>
                <i>{t('home.noCoursesMsg')}</i>
              </Typography>
            </Grid>
          )
          : courses.map((course) => (
            <Grid item key={`course-${course.id}`} className={classes.gridLink}>
              <Link href={`/courses/${course.id}`} color="secondary">
                <Typography variant="h6">
                  &gt;&nbsp;
                  {course.name}
                </Typography>
              </Link>
            </Grid>
          ))
      }
    </Grid>
  );

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs={12}>
        <Grid container direction="column" className={classes.listGrid}>
          {adminCourses.length > 0 && courseList(adminCourses, t('home.admCourse'))}
          {courseList(participatingCourses, t('home.lrnCourse'))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Section.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  coursesList: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Section);
