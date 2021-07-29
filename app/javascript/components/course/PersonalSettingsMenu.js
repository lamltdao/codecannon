import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useTranslation } from 'react-i18next';
import Popper from '@material-ui/core/Popper';
import axios from 'axios';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LanguagesBar from '../common/LanguagesBar';
import AxiosHeader from '../../helpers/AxiosHeader';

const styles = (theme) => ({
  paper: {
    display: 'flex',
    marginRight: theme.spacing(6),
  },
  email: {
    color: 'white',
    textAlign: 'end',
  },
});

const PopdownMenu = (props) => {
  const { user } = window.gon;
  const { t } = useTranslation();
  const { classes } = props;
  const anchorRef = useRef();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDropdownClose = () => {
    if (!open) return;
    setOpen(false);
  };

  const redirectLogout = (e) => {
    e.preventDefault();
    axios({
      url: '/users/logout',
      method: 'DELETE',
      headers: AxiosHeader,
    }).then(() => {
      window.location.href = '/';
    }).catch(() => {});
  };

  const redirectProfile = () => {
    window.location.href = `/profile/${user.username}`;
  };

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Typography variant="h6" className={classes.email}>
          {t('course.navbar.loggedInAs')}
          <b>
            {` ${user.display_name} `}
          </b>
          (
          {user.username}
          )
        </Typography>
        <ArrowDropDownIcon style={{ color: '#fff' }} />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" disablePortal>
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={handleDropdownClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              <MenuItem onClick={redirectProfile}>{t('course.navbar.profile')}</MenuItem>
              <MenuItem onClick={() => null}>{t('course.navbar.settings')}</MenuItem>
              <MenuItem onClick={() => null}>{t('course.navbar.report')}</MenuItem>
              <hr width="90%" />
              <MenuItem onClick={redirectLogout}>{t('common.logout')}</MenuItem>
              <hr width="90%" />
              <LanguagesBar />
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

PopdownMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PopdownMenu);
