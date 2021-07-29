import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import MembersTable from './MembersTable';
import MembersDialog from './MembersDialog';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2.5),
  },
  avatarCell: {
    width: 1,
  },
});

const CourseMembersTables = (props) => {
  const { classes } = props;
  const { t } = useTranslation();
  return (
    <Grid container className={classes.root} direction="column" spacing={5}>
      <Grid item>
        <MembersDialog />
      </Grid>
      <Grid item>
        <Typography variant="h3">
          {t('course.member.pageTitle')}
        </Typography>
      </Grid>
      <Grid item>
        <MembersTable
          membersList={window.gon.members.admin}
          tableTitle={t('course.member.adminListTitle')}
        />
      </Grid>
      <Grid item>
        <MembersTable
          membersList={window.gon.members.participants}
          tableTitle={t('course.member.partiListTitle')}
        />
      </Grid>
    </Grid>
  );
};

CourseMembersTables.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CourseMembersTables);
