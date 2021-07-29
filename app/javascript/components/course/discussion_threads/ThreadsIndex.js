import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import vietnameseStrings from 'react-timeago/lib/language-strings/vi';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import CourseConfigurationBar from '../CourseConfigurationBar';
import { BORDER_LIGHT_GREY } from '../../../shared/Constants';
import VoteButtons from './VoteButtons';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import GetDateInMilliSeconds from '../../../helpers/GetDateInMilliSeconds';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  threadCard: {
    width: '100%',
    borderRadius: 0,
    border: `solid ${BORDER_LIGHT_GREY} 1px`,
    margin: theme.spacing(0.5),
  },
  typography: {
    textAlign: 'justify',
  },
  threadTitle: {
    color: 'black',
    fontSize: '4rem',
    fontWeight: 'bold',
    wordWrap: 'break-word',
  },
  primaryTypography: {
    color: theme.palette.primary.main,
  },
  threadInfoGrid: {
    paddingRight: theme.spacing(2),
  },
  mentorInfoGrid: {
    borderLeft: `solid ${BORDER_LIGHT_GREY} 1px`,
    paddingLeft: theme.spacing(2),
  },
  noThreadContainer: {
    minHeight: '80vh',
  },
  noThreadIcon: {
    height: '15rem',
    width: '15rem',
    color: `${BORDER_LIGHT_GREY}`,
  },
  noThreadTypography: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: `${BORDER_LIGHT_GREY}`,
  },
});

const Threads = (props) => {
  const { t, i18n } = useTranslation();
  const formatter = i18n.language === 'vn' ? buildFormatter(vietnameseStrings) : buildFormatter(englishStrings);
  const { classes } = props;
  const {
    threads,
    course,
    isMentor,
  } = window.gon;
  const [threadsScore, setThreadsScore] = useState(() => {
    const initThreadsScore = {};
    threads.forEach((thread) => {
      initThreadsScore[thread.id] = thread.score;
    });
    return initThreadsScore;
  });
  const [userVotes, setUserVotes] = useState(() => {
    const initUserVotes = {};
    threads.forEach((thread) => {
      initUserVotes[thread.id] = thread.vote;
    });
    return initUserVotes;
  });
  const { id: courseId } = course;
  const linkToShowPage = (threadId) => (`/courses/${courseId}/threads/${threadId}`);
  const configButtons = [
    {
      label: t('course.threads.new.newBtn'),
      onClick: () => { window.location.href = `/courses/${courseId}/threads/new`; },
    },
  ];

  return (
    <Grid container className={classes.root}>
      {isMentor && <CourseConfigurationBar buttons={configButtons} />}
      {threads.length > 0 ? (threads.map((threadItem) => (
        <Card
          className={classes.threadCard}
          key={threadItem.id}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={9} className={classes.threadInfoGrid}>
                <Link underline="none" href={linkToShowPage(threadItem.id)}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    className={classes.threadTitle}
                  >
                    {threadItem.title}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={3} className={classes.mentorInfoGrid}>
                <Grid container direction="row" spacing={3}>
                  <Grid item>
                    <Avatar src={threadItem.user.avatar_url} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" className={classes.primaryTypography}>
                      {threadItem.user.display_name}
                    </Typography>
                    <Typography className={classes.typography}>
                      {t('course.threads.updated')}
                      &nbsp;
                      <TimeAgo
                        date={GetDateInMilliSeconds(threadItem.last_updated)}
                        formatter={formatter}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container>
              <Grid item className={classes.classInfoGrid}>
                <MarkdownRenderer>
                  {threadItem.body}
                </MarkdownRenderer>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <VoteButtons
                  votableType="threads"
                  votableId={threadItem.id}
                  vote={userVotes[threadItem.id]}
                  setVotes={setUserVotes}
                  score={threadsScore[threadItem.id]}
                  setScores={setThreadsScore}
                />
              </Grid>
              <Grid item>
                <Link color="inherit" href={linkToShowPage(threadItem.id)}>
                  <CommentIcon />
                </Link>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ))) : (
        <Grid
          container
          className={classes.noThreadContainer}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <QuestionAnswerIcon className={classes.noThreadIcon} />
          </Grid>
          <Grid item>
            <Typography className={classes.noThreadTypography}>{t('course.threads.noThreads')}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

Threads.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Threads);
