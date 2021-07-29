import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import { useTranslation } from 'react-i18next';

const styles = (theme) => ({
  folder: {
    width: '30%',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  folderTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const Folders = (props) => {
  const { t } = useTranslation();
  const { classes, folders, course } = props;
  const generateFolderPath = (id = '') => (`/courses/${course.id}/materials/${id}`);

  return (
    <>
      {folders.length > 0
        ? (
          <Grid container direction="row">
            {folders.map((folder) => (
              <Button
                href={generateFolderPath(folder.id)}
                className={classes.folder}
                variant="contained"
                key={`folder-${folder.id}`}
              >
                <Grid container justify="space-between">
                  <Grid item xs={3}>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6" className={classes.folderTitle}>
                      {folder.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            ))}
          </Grid>
        )
        : (
          <Typography>
            {t('course.materials.noFolder')}
          </Typography>
        )}
    </>
  );
};

Folders.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  folders: PropTypes.instanceOf(Array).isRequired,
  course: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Folders);
