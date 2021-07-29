import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/styles';
import {
  Card, CardContent, CardHeader, Grid, Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CodecannonButton from '../../common/CodecannonButton';
import CourseFileUploadDropzone from './CourseFileUploadDropzone';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '40%',
    backgroundColor: 'white',
    outline: 0,
  },
  root: {
    width: '100%',
    height: '100%',
  },
  modalHeader: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  modalBody: {
    marginTop: theme.spacing(0.5),
  },
  gridItem: {
    marginRight: theme.spacing(2),
  },
  modalBodyTitle: {
    marginBottom: theme.spacing(2.5),
  },
});

const CourseFileUploadModal = (props) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const {
    modalFileOpen, closeFileModal, classes,
    enqueueSnackbar,
  } = props;
  const {
    folderPath,
    course, user, currentFolder,
  } = window.gon;
  const { id: currentFolderId } = currentFolder;
  const path = folderPath
    .reduce((acc, cur) => `${acc} > ${cur.title}`, '')
    .slice(2);

  const uploadFile = (e) => {
    e.preventDefault();
    const fileName = file ? file.name : '';
    const data = new FormData();
    data.append('material[title]', fileName);
    data.append('material[file]', file);
    data.append('material[course_id]', course.id);
    data.append('material[parent_folder_id]', currentFolderId);
    data.append('material[creator_id]', user.id);

    const url = `/courses/${course.id}/files`;
    const successRedirectUrl = `/courses/${course.id}/materials/${currentFolderId}`;
    axios({
      url,
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Successfully uploaded', 'success');
      window.location.href = successRedirectUrl;
    }).catch((err) => {
      PushSnackbarMessage(enqueueSnackbar, err.errors, 'error');
    });
  };

  return (
    <Modal open={modalFileOpen} onClose={closeFileModal} className={classes.modal}>
      <Card className={classes.card}>
        <CardHeader title={t('course.materials.uploadFile')} className={classes.modalHeader} />
        <CardContent className={classes.modalBody}>
          <Typography className={classes.modalBodyTitle}>
            {t('course.materials.uploadFileMessage')}
            {path}
          </Typography>
          <CourseFileUploadDropzone setFile={setFile} />
          <Grid container justify="flex-end">
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" onClick={closeFileModal} variant="outlined">
                {t('course.materials.cancel')}
              </CodecannonButton>
            </Grid>
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" type="submit" variant="outlined" onClick={uploadFile}>
                {t('course.materials.save')}
              </CodecannonButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

CourseFileUploadModal.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  modalFileOpen: PropTypes.bool.isRequired,
  closeFileModal: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(CourseFileUploadModal));
