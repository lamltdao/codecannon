import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'react-i18next';
import Files from './Files';
import Folders from './Folders';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  gridItem: {
    marginBottom: theme.spacing(1),
    display: 'contents',
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
});

const CourseMaterials = (props) => {
  const { t } = useTranslation();
  const { classes } = props;
  const {
    files, folders, course, folderPath,
  } = window.gon;
  const generateFolderPath = (id = '') => (`/courses/${course.id}/materials/${id}`);

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.gridItem}>
        <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />}>
          {folderPath.map((folder) => (
            <Link color="inherit" href={generateFolderPath(folder.id)} key={`folder-${folder.id}`}>
              <Typography variant="h6">
                {folder.title}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="h6" className={classes.sectionTitle}>
          {t('course.materials.folders')}
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Folders folders={folders} course={course} />
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="h6" className={classes.sectionTitle}>
          {t('course.materials.files')}
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Files files={files} course={course} />
      </Grid>
    </Grid>
  );
};

CourseMaterials.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseMaterials);
