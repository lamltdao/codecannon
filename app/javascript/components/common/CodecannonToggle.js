import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';
import { BUTTON_BOX_SHADOW } from '../../shared/Constants';

const styles = (theme) => ({
  root: {
    borderRadius: theme.spacing(5),
    fontSize: '2rem',
    color: '#fff',
    width: '100%',
    height: '100%',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    boxShadow: BUTTON_BOX_SHADOW,
  },
  selected: {
    backgroundColor: `${theme.palette.primary.dark} !important`,
    color: '#fff !important',
  },
});

const CodecannonToggle = (props) => {
  const {
    classes, ...rest
  } = props;
  return (
    <ToggleButton
      {...rest}
      classes={{
        root: classes.root,
        selected: classes.selected,
      }}
    />
  );
};

CodecannonToggle.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CodecannonToggle);
