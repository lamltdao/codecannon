import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = (theme) => ({
  large: {
    borderRadius: theme.spacing(5),
    fontSize: '2rem',
    width: '100%',
    height: '100%',
    textTransform: 'none',
  },
  medium: {
    borderRadius: theme.spacing(5),
    fontSize: '1.2rem',
    width: '100%',
    height: '100%',
    textTransform: 'none',
  },
  outlined: {
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  text: {
    width: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  small: {
    borderRadius: theme.spacing(2.5, 2.5),
    borderWidth: 1,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    '&:hover': {
      borderWidth: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
});

const CodecannonButton = (props) => {
  const {
    classes, variant, color, buttonSize, ...rest
  } = props;
  return (
    <Button
      {...rest}
      className={classes[buttonSize]}
      variant={variant}
      color={color}
      classes={{
        outlined: classes.outlined,
        text: classes.text,
      }}
    />
  );
};

CodecannonButton.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  buttonSize: PropTypes.oneOf(['large', 'medium', 'small']),
};

CodecannonButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
  buttonSize: 'large',
};

export default withStyles(styles)(CodecannonButton);
