import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_COURSE_COVER_IMAGE, BORDER_LIGHT_GREY } from '../../../shared/Constants';
import CourseConfigurationBar from '../CourseConfigurationBar';
import MarkdownRenderer from '../../common/MarkdownRenderer';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  card: {
    width: '100%',
    boxShadow: 'none',
    borderRadius: 0,
  },
  media: {
    paddingTop: '20%',
  },
  primaryTypography: {
    color: theme.palette.primary.main,
  },
  mentorTitle: {
    fontWeight: 700,
  },
  classInfoGrid: {
    paddingRight: theme.spacing(2),
  },
  mentorInfoGrid: {
    borderLeft: `solid ${BORDER_LIGHT_GREY} 1px`,
    paddingLeft: theme.spacing(2),
  },
  avatarGrid: {
    width: '100%',
  },
});

const CourseHome = (props) => {
  const { classes } = props;
  const { mentor, course } = window.gon;
  const { isMentor } = window.gon;
  const { t } = useTranslation();
  const configButtons = [
    {
      label: t('course.home.editBtn'),
      onClick: () => { window.location.href = `/courses/${course.id}/edit`; },
    },
  ];
  return (
    <Grid container className={classes.root}>
      {isMentor && <CourseConfigurationBar buttons={configButtons} />}
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={DEFAULT_COURSE_COVER_IMAGE}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={9} className={classes.classInfoGrid}>
              <Typography gutterBottom variant="h4" className={classes.primaryTypography}>
                {course.welcome_message}
              </Typography>
              <MarkdownRenderer>
                {course.overview}
              </MarkdownRenderer>
            </Grid>
            <Grid item xs={3} className={classes.mentorInfoGrid}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={3}>
                  <Grid container className={classes.avatarGrid} justify="center">
                    <Grid item>
                      <Avatar />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Typography className={classes.mentorTitle}>
                    {t('course.home.mentor')}
                  </Typography>
                  <Typography variant="h5" className={classes.primaryTypography}>
                    {mentor.display_name}
                  </Typography>
                  <Typography className={classes.typography}>
                    E-mail:
                    {` ${mentor.email}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

CourseHome.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseHome);
