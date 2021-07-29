import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import { useTranslation } from 'react-i18next';
import TableRow from '@material-ui/core/TableRow';
import { Avatar, Grid } from '@material-ui/core';

const styles = () => ({
  avatarCell: {
    width: 1,
  },
  tableHead: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  tableCell: {
    fontSize: '1rem',
  },
});

const MemberTable = (props) => {
  const { classes, membersList, tableTitle } = props;
  const { t } = useTranslation();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h5">{tableTitle}</Typography>
      </Grid>
      <Grid item>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.avatarCell} />
                <TableCell className={classes.tableHead}>{t('course.member.user')}</TableCell>
                <TableCell className={classes.tableHead}>E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersList.map((row) => (
                <TableRow key={row.email} hover>
                  <TableCell className={classes.avatarCell}><Avatar /></TableCell>
                  <TableCell className={classes.tableCell}>{row.display_name}</TableCell>
                  <TableCell className={classes.tableCell}>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

MemberTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  membersList: PropTypes.instanceOf(Array).isRequired,
  tableTitle: PropTypes.string.isRequired,
};

export default withStyles(styles)(MemberTable);
