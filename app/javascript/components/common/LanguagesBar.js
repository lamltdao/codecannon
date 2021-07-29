import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Flag from 'react-flagpack';
import '../../translate/i18n';

const styles = (theme) => ({
  button: {
    padding: 0,
    minWidth: 0,
    margin: theme.spacing(1),
  },
  label: {
    minWidth: 0,
  },
});

const CodecannonButton = (props) => {
  const {
    classes,
  } = props;

  const { i18n } = useTranslation();

  const handleLang = (lang) => {
    window.location.reload();
    i18n.changeLanguage(lang);
  };
  return (
    <Grid container className={classes.root} justify="center">
      <Button
        className={classes.button}
        onClick={() => handleLang('en')}
        disableRipple
        disableFocusRipple
        classes={{ label: classes.label }}
      >
        <Flag code="GB-UKM" size="L" />
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleLang('vn')}
        disableRipple
        disableFocusRipple
        classes={{ label: classes.label }}
      >
        <Flag code="VN" size="L" />
      </Button>
    </Grid>
  );
};

CodecannonButton.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(CodecannonButton);
