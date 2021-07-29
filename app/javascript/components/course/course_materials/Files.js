import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import GetAppIcon from '@material-ui/icons/GetApp';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  paper: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    backgroundColor: 'black',
  },
  iframe: {
    border: 'none',
  },
  previewFileTitle: {
    position: 'absolute',
    top: 0,
    color: theme.palette.primary.contrastText,
  },
  deleteFileButton: {
    minWidth: '10px',
    '&:hover': {
      background: 'none',
    },
  },
});

const Files = (props) => {
  const { t } = useTranslation();
  const {
    classes, files, course, enqueueSnackbar,
  } = props;
  const iframeRef = useRef(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const handleFilePreview = (e, file) => {
    e.preventDefault();
    setOpenPreview(!openPreview);
    setPreviewFile(file);
  };

  const handleClosePreview = (e) => {
    e.preventDefault();
    setPreviewFile(null);
    if (openPreview) setOpenPreview(false);
  };

  const getFileDimension = (contentType, frame) => {
    const dimension = {
      height: '',
      width: '',
    };
    if (contentType === 'application/pdf') {
      dimension.height = '95%';
      dimension.width = '100%';
    } else {
      // set the height of the iframe as
      // the height of the iframe content
      dimension.height = frame ? `${frame.contentWindow.document.body.scrollHeight}px` : 0;
      // set the width of the iframe as the
      // width of the iframe content
      dimension.width = frame ? `${frame.contentWindow.document.body.scrollWidth}px` : 0;
    }

    return dimension;
  };

  const handleIframeLoad = (e, contentType) => {
    e.preventDefault();
    const frame = iframeRef.current;
    const { height, width } = getFileDimension(contentType, frame);
    frame.style.height = height;
    frame.style.width = width;

    // set iframe to be visible
    // after its dimensions are calculated
    frame.style.display = null;
  };

  const deleteFile = (e, fileId) => {
    e.preventDefault();
    const url = `/courses/${course.id}/files/${fileId}`;
    axios({
      url,
      method: 'DELETE',
      headers: AxiosHeader,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Successfully deleted', 'success');
      window.location.reload();
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  return (
    <>
      {files.length > 0
        ? (
          <List>
            {files.map((file) => (
              <React.Fragment key={file.id}>
                <Divider />
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={11}>
                    <ListItem button onClick={(e) => handleFilePreview(e, file)}>
                      <Typography variant="h6">
                        {file.title}
                      </Typography>
                    </ListItem>
                  </Grid>
                  <Grid item xs={1}>
                    <Grid container direction="row" alignItems="center" justify="flex-end">
                      <Grid item>
                        <Button
                          className={classes.deleteFileButton}
                          onClick={(e) => deleteFile(e, file.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Link href={file.downloadUrl}>
                          <GetAppIcon />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Backdrop
                  className={classes.backdrop}
                  open={openPreview}
                  onClick={handleClosePreview}
                >
                  {previewFile && (
                    <>
                      <Typography variant="h6" className={classes.previewFileTitle}>
                        {previewFile.title}
                      </Typography>
                      <Paper elevation={3} className={classes.paper}>
                        <iframe
                          ref={iframeRef}
                          // only visible after dimensions are determined
                          style={{ display: 'none' }}
                          title="test"
                          src={previewFile.previewUrl}
                          className={classes.iframe}
                          onLoad={(e) => handleIframeLoad(e, previewFile.contentType)}
                        >
                          Text
                        </iframe>
                      </Paper>
                    </>
                  )}
                </Backdrop>
              </React.Fragment>
            ))}
            <Divider />
          </List>
        )
        : (
          <Typography>
            {t('course.materials.noFile')}
          </Typography>
        )}
    </>
  );
};

Files.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  course: PropTypes.instanceOf(Object).isRequired,
  files: PropTypes.instanceOf(Array).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(Files));
