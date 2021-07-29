import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { SECTION_OPTIONS } from '../shared/Constants';
import Logo from './Logo';
import CourseIndex from './CourseIndex';

const styles = () => ({
  root: {
    height: '100%',
  },
  innerGrid: {
    height: '100%',
    width: '100%',
  },
});

const Section = (props) => {
  const { section, classes } = props;
  const { courses } = window.gon;
  const { t } = useTranslation();
  return (
    <Grid container direction="column" className={classes.root} alignItems="center" justify="center">
      <Grid
        item
        xs={10}
        className={classes.innerGrid}
        hidden={section !== SECTION_OPTIONS.logo}
      >
        <Logo />
      </Grid>
      <Grid
        item
        xs={10}
        className={classes.innerGrid}
        hidden={section !== SECTION_OPTIONS.courses}
      >
        <CourseIndex coursesList={courses} />
      </Grid>
      <Grid
        item
        xs={10}
        className={classes.innerGrid}
        hidden={section !== SECTION_OPTIONS.contests}
      >
        <Typography variant="h4">{t('home.featureInDev')}</Typography>
      </Grid>
      <Grid
        item
        xs={10}
        className={classes.innerGrid}
        hidden={section !== SECTION_OPTIONS.blog}
      >
        <Typography variant="h4">{t('home.featureInDev')}</Typography>
      </Grid>
      <Grid
        item
        xs={10}
        className={classes.innerGrid}
        hidden={section !== SECTION_OPTIONS.aboutUs}
      >
        <Typography variant="h4">{t('home.featureInDev')}</Typography>
      </Grid>
    </Grid>
  );
};

Section.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  section: PropTypes.string.isRequired,
};

export default withStyles(styles)(Section);
