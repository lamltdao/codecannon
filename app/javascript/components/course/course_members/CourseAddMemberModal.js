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

const CourseAddMemberModal = (props) => {
  const { t } = useTranslation();
  const [memberEmail, setMemberEmail] = useState('');
  const {
    modalAddMemberOpen, closeAddMemberModal, classes, enqueueSnackbar,
  } = props;
  const { course } = window.gon;

  const handleTextFieldChange = (e) => {
    e.preventDefault();
    setMemberEmail(e.target.value);
  };

  const addMember = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('member_email', memberEmail);
    const url = `/courses/${course.id}/members/send_confirmation`;
    axios({
      url,
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Email successfully sent', 'success');
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  return (
    <Modal open={modalAddMemberOpen} onClose={closeAddMemberModal} className={classes.modal}>
      <Card className={classes.card}>
        <CardHeader title={t('course.member.addMember')} className={classes.modalHeader} />
        <CardContent className={classes.modalBody}>
          <Typography className={classes.modalBodyTitle}>
            {t('course.member.addMemberMessage')}
          </Typography>
          <CodecannonTextField
            placeholder={t('course.member.addMemberTextFieldPlaceholder')}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
          <Grid container justify="flex-end">
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" onClick={closeAddMemberModal} variant="outlined">
                {t('course.member.cancel')}
              </CodecannonButton>
            </Grid>
            <Grid item className={classes.gridItem}>
              <CodecannonButton buttonSize="small" type="submit" variant="outlined" onClick={addMember}>
                {t('course.member.addMember')}
              </CodecannonButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

CourseAddMemberModal.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  modalAddMemberOpen: PropTypes.bool.isRequired,
  closeAddMemberModal: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(CourseAddMemberModal));
