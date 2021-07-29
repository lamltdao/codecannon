import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  Grid, Link, ThemeProvider, Typography,
} from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import AxiosHeader from '../helpers/AxiosHeader';
import CodecannonButton from './common/CodecannonButton';
import CodecannonToggle from './common/CodecannonToggle';
import AdminTheme from './theme/AdminTheme';
import { SECTION_OPTIONS } from '../shared/Constants';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 6),
  },
  gridButtonGroup: {
    paddingTop: theme.spacing(5),
  },
  gridButton: {
    padding: theme.spacing(2.5),
  },
  buttonSpan: {
    width: '100%',
  },
  buttonLogo: {
    fontSize: '2rem',
  },
});

const HomeNavigationPanel = ({ classes, setSection, section }) => {
  const { t } = useTranslation();
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

  const isSectionSelected = (sectionOption) => (sectionOption === section);
  const handleSectionChange = (sectionOption) => {
    setSection(section === sectionOption
      ? SECTION_OPTIONS.logo
      : sectionOption);
  };
  const { username, site_admin: isSiteAdmin } = window.gon.user;
  const HighlightedLink = React.forwardRef(
    (props, ref) => <Link {...props} ref={ref} color="secondary" />,
  );
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography variant="h2">
          {t('home.welcome')}
          <Link href={`profile/${username}`} color="inherit">
            {username}
          </Link>
        </Typography>
      </Grid>
      <Grid container className={classes.gridButtonGroup} justify="center">
        <Grid item xs={6} className={classes.gridButton}>
          <CodecannonToggle
            value={SECTION_OPTIONS.courses}
            selected={isSectionSelected(SECTION_OPTIONS.courses)}
            onChange={() => handleSectionChange(SECTION_OPTIONS.courses)}
          >
            {t('home.learn')}
          </CodecannonToggle>
        </Grid>
        <Grid item xs={6} className={classes.gridButton}>
          <CodecannonToggle
            value={SECTION_OPTIONS.contests}
            selected={isSectionSelected(SECTION_OPTIONS.contests)}
            onChange={() => handleSectionChange(SECTION_OPTIONS.contests)}
          >
            {t('home.compete')}
          </CodecannonToggle>
        </Grid>
        <Grid item xs={6} className={classes.gridButton}>
          <CodecannonToggle
            value={SECTION_OPTIONS.blog}
            selected={isSectionSelected(SECTION_OPTIONS.blog)}
            onChange={() => handleSectionChange(SECTION_OPTIONS.blog)}
          >
            {t('home.blog')}
          </CodecannonToggle>
        </Grid>
        <Grid item xs={6} className={classes.gridButton}>
          <CodecannonToggle
            value={SECTION_OPTIONS.aboutUs}
            selected={isSectionSelected(SECTION_OPTIONS.aboutUs)}
            onChange={() => handleSectionChange(SECTION_OPTIONS.aboutUs)}
          >
            {t('home.aboutUs')}
          </CodecannonToggle>
        </Grid>
        <Grid item xs={6} className={classes.gridButton}>
          <CodecannonButton
            onClick={redirectLogout}
            color="secondary"
            component={HighlightedLink}
            variant="text"
          >
            {t('common.logout')}
          </CodecannonButton>
        </Grid>
        {
          isSiteAdmin && (
            <ThemeProvider theme={AdminTheme}>
              <Grid item xs={6} className={classes.gridButton}>
                <CodecannonButton href="/admin/courses/new">
                  <span className={classes.buttonSpan}>{t('home.admPortal')}</span>
                  <KeyboardArrowRight className={classes.buttonLogo} />
                </CodecannonButton>
              </Grid>
            </ThemeProvider>
          )
        }
      </Grid>
    </Grid>
  );
};

HomeNavigationPanel.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  setSection: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
};

export default withStyles(styles)(HomeNavigationPanel);
