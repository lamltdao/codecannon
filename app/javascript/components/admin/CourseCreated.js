import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Grid, Link } from '@material-ui/core';
import CodecannonButton from '../common/CodecannonButton';

const styles = (theme) => ({
  grid: {
    margin: theme.spacing(4, 0),
  },
});

const CourseCreated = (props) => {
  const { classes } = props;
  const { t } = useTranslation();
  const { courseUrl } = window.gon;

  const handleCopy = () => {
    navigator.clipboard.writeText(courseUrl);
  };

  return (
    <Grid container direction="column">
      <Grid item className={classes.grid}>
        <Typography variant="h4">{t('admin.courseCreatedMsg')}</Typography>
      </Grid>
      <Grid item className={classes.grid}>
        <Link href={courseUrl} color="secondary">
          <Typography variant="h4">{courseUrl}</Typography>
        </Link>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={5}>
          <CodecannonButton
            variant="text"
            color="secondary"
            disableRipple
            href="/admin/courses/new"
          >
            Back
          </CodecannonButton>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <CodecannonButton
            variant="text"
            color="secondary"
            disableRipple
            onClick={handleCopy}
          >
            Copy
          </CodecannonButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

CourseCreated.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseCreated);
