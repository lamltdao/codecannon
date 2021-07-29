import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { InputAdornment } from '@material-ui/core';
import { BORDER_LIGHT_GREY, INPUT_DISABLED_BACKGROUND } from '../../shared/Constants';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(4),
    border: `1px solid ${BORDER_LIGHT_GREY}`,
  },
  input: {
    flex: 1,
    paddingLeft: theme.spacing(3),
    fontSize: '1.2rem',
  },
  textArea: {
    lineHeight: '1.5em',
  },
  disabledTextField: {
    color: 'black',
    cursor: 'not-allowed',
  },
  endAdornment: {
    paddingRight: theme.spacing(1),
  },
});

const CodecannonTextField = (props) => {
  const {
    classes, endAdornment, withBorder, paperStyles, disabled, ...rest
  } = props;
  return (
    <Paper
      className={classes.root}
      elevation={0}
      style={{ ...paperStyles, backgroundColor: disabled ? INPUT_DISABLED_BACKGROUND : '#ffffff' }}
    >
      <InputBase
        className={classes.input}
        classes={{
          input: classes.textArea,
          disabled: classes.disabledTextField,
        }}
        disabled={disabled}
        {...rest}
      />
      <InputAdornment className={classes.endAdornment}>
        {endAdornment}
      </InputAdornment>
    </Paper>
  );
};

CodecannonTextField.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  endAdornment: PropTypes.element,
  withBorder: PropTypes.bool,
  paperStyles: PropTypes.instanceOf(Object),
  disabled: PropTypes.bool,
};

CodecannonTextField.defaultProps = {
  endAdornment: (<></>),
  withBorder: false,
  paperStyles: {},
  disabled: false,
};

export default withStyles(styles)(CodecannonTextField);
