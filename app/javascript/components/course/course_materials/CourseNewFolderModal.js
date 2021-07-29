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
import CodecannonTextField from '../../common/CodecannonTextField';
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

const CourseNewFolderModal = (props) => {
  const { t } = useTranslation();
  const [newFolderName, setNewFolderName] = useState('');
  const {
    modalFolderOpen, closeFolderModal, classes, enqueueSnackbar,
  } = props;
  const {
    folderPath, course, user, currentFolder,
  } = window.gon;
  const { id: currentFolderId } = currentFolder;
  const path = folderPath
    .reduce((acc, cur) => `${acc} > ${cur.title}`, '')
    .slice(2);

  const handleTextFieldChange = (e) => {
    e.preventDefault();
    setNewFolderName(e.target.value);
  };

  const createNewFolder = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('folder[title]', newFolderName);
    if (currentFolderId) data.append('folder[parent_folder_id]', currentFolderId);
    data.append('folder[creator_id]', user.id);

    const url = `/courses/${course.id}/materials`;
    const successRedirectUrl = `${url}/${currentFolderId}`;
    axios({
      url,
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Successfully created', 'success');
      window.location.href = successRedirectUrl;
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  return (
    <Modal open={modalFolderOpen} onClose={closeFolderModal} className={classes.modal}>
      <Card className={classes.card}>
        <CardHeader title={t('course.materials.newFolder')} className={classes.modalHeader} />
        <CardContent className={classes.modalBody}>
          <Typography className={classes.modalBodyTitle}>
            {t('course.materials.newFolderMessage')}
            {path}
          </Typography>
          <CodecannonTextField
            placeholder={t('course.materials.newFolderTextFieldPlaceholder')}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
          <Grid container justify="flex-end">
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" onClick={closeFolderModal} variant="outlined">
                {t('course.materials.cancel')}
              </CodecannonButton>
            </Grid>
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" type="submit" variant="outlined" onClick={createNewFolder}>
                {t('course.materials.save')}
              </CodecannonButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

CourseNewFolderModal.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  modalFolderOpen: PropTypes.bool.isRequired,
  closeFolderModal: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(CourseNewFolderModal));
