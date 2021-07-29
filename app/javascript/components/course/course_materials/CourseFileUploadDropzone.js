import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useTranslation } from 'react-i18next';
import { BORDER_LIGHT_GREY } from '../../../shared/Constants';

const styles = (theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    outline: 0,
    height: theme.spacing(20),
    borderStyle: 'dotted',
    borderColor: BORDER_LIGHT_GREY,
  },
  largeIcon: {
    fontSize: theme.spacing(10),
  },
  iconRoot: {
    color: BORDER_LIGHT_GREY,
  },
});

const MyDropzone = (props) => {
  const { t } = useTranslation();
  const { classes, setFile } = props;
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, application/pdf', maxFiles: 1 });

  const removeUploadedFile = (e) => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <>
      <Paper elevation={0} {...getRootProps()} className={classes.paper}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <Typography>{t('course.materials.dropzoneMessageWhenDrag')}</Typography>
            : (
              <Grid container direction="column" alignItems="center" justify="space-evenly" className={classes.root}>
                <CloudUploadIcon fontSize="large" classes={{ fontSizeLarge: classes.largeIcon, root: classes.iconRoot }} />
                <Typography align="center">{t('course.materials.dropzoneMessageWhenUndrag')}</Typography>
              </Grid>
            )
        }
      </Paper>
      {acceptedFiles.map((file) => (
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography>
              {file.name}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={removeUploadedFile}>x</Button>
          </Grid>
        </Grid>
      ))}
      {fileRejections.length > 0 && (
        <Typography color="primary">
          {fileRejections[0].errors[0].message}
        </Typography>
      )}
    </>
  );
};

MyDropzone.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  setFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyDropzone);
