import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CodecannonButton from './common/CodecannonButton';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 6),
  },
  grid: {
    padding: theme.spacing(5, 2.5),
  },
});

const Welcome = (props) => {
  const { classes } = props;
  const { t } = useTranslation();
  const redirectLogin = () => {
    window.location.pathname = '/users/login';
  };
  const redirectSignUp = () => {
    window.location.pathname = '/users/sign_up';
  };
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h2">{t('landing.msg')}</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={6} className={classes.grid}>
          <CodecannonButton onClick={redirectLogin}>{t('common.login')}</CodecannonButton>
        </Grid>
        <Grid item xs={6} className={classes.grid}>
          <CodecannonButton color="secondary" onClick={redirectSignUp}>
            {t('common.signUp')}
          </CodecannonButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

Welcome.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Welcome);
