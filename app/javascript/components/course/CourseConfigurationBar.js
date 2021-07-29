import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodecannonButton from '../common/CodecannonButton';
import { BORDER_LIGHT_GREY } from '../../shared/Constants';

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: `1px solid ${BORDER_LIGHT_GREY}`,
    zIndex: 0,
  },
  button: {
    margin: theme.spacing(0.5),
  },
});

const CourseConfigurationBar = (props) => {
  const { classes, buttons } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} />
        {
          buttons.map((button) => (
            <div key={button.label} className={classes.button}>
              <CodecannonButton variant="outlined" buttonSize="medium" onClick={button.onClick}>
                {button.label}
              </CodecannonButton>
            </div>
          ))
        }
      </Toolbar>
    </AppBar>
  );
};

CourseConfigurationBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  buttons: PropTypes.instanceOf(Object),
};

CourseConfigurationBar.defaultProps = {
  buttons: [],
};

export default withStyles(styles)(CourseConfigurationBar);
