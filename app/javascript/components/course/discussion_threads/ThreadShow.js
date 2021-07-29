import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import vietnameseStrings from 'react-timeago/lib/language-strings/vi';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import VoteButtons from './VoteButtons';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import CommentBlock from './CommentBlock';
import CommentTextField from './CommentTextField';
import GetDateInMilliSeconds from '../../../helpers/GetDateInMilliSeconds';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
  },
  threadCard: {
    width: '100%',
    borderRadius: 0,
    margin: theme.spacing(0.5),
  },
  typography: {
    textAlign: 'justify',
  },
  threadTitle: {
    color: 'black',
    fontSize: '4rem',
    fontWeight: 'bold',
    wordBreak: 'break-word',
  },
  primaryTypography: {
    color: theme.palette.primary.main,
  },
  threadTitleGrid: {
    paddingRight: theme.spacing(2),
  },
  threadBody: {
    fontSize: '1.2rem',
    whiteSpace: 'pre-line',
  },
  replyCommentTextfield: {
    marginLeft: theme.spacing(8),
  },
  replyCommentGridItem: {
    marginRight: 'auto',
    width: '90%',
  },
});

const ThreadShow = (props) => {
  const {
    classes,
  } = props;
  const { t, i18n } = useTranslation();
  const formatter = i18n.language === 'vn' ? buildFormatter(vietnameseStrings) : buildFormatter(englishStrings);
  const [isCommentTextfieldOpen, setIsCommentTextfieldOpen] = useState(true);
  const {
    thread,
    isStudent,
    comments,
    course,
  } = window.gon;
  const [threadScore, setThreadScore] = useState({ [thread.id]: thread.score });
  const [threadVote, setThreadVote] = useState({ [thread.id]: thread.vote });

  const [commentScores, setCommentScores] = useState(() => {
    const initCommentScores = {};
    comments.forEach((comment) => {
      initCommentScores[comment.id] = comment.score;
      comment.comments.forEach((reply) => {
        initCommentScores[reply.id] = reply.score;
      });
    });
    return initCommentScores;
  });
  const [commentVotes, setCommentVotes] = useState(() => {
    const initCommentVotes = {};
    comments.forEach((comment) => {
      initCommentVotes[comment.id] = comment.vote;
      comment.comments.forEach((reply) => {
        initCommentVotes[reply.id] = reply.vote;
      });
    });
    return initCommentVotes;
  });

  const replyTextFieldOpen = {};
  comments.forEach((comment) => {
    replyTextFieldOpen[comment.id] = false;
  });
  const [isReplyTextfieldOpen, setIsReplyTextfieldOpen] = useState(replyTextFieldOpen);

  const { id: courseId } = course;
  const { id: threadId } = thread;

  const getVoteButtonsProps = (votableType, votableId, vote, setVotes, score, setScores) => ({
    votableType,
    votableId,
    vote,
    setVotes,
    score,
    setScores,
  });

  const handleCommentTextFieldOpen = (e) => {
    e.preventDefault();
    setIsCommentTextfieldOpen(!isCommentTextfieldOpen);
  };

  const redirectToEditThread = () => {
    window.location.href = `/courses/${courseId}/threads/${threadId}/edit`;
  };

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item className={classes.threadTitleGrid}>
        <Typography
          gutterBottom
          variant="h3"
          className={classes.threadTitle}
        >
          {thread.title}
        </Typography>
      </Grid>
      <Grid item className={classes.mentorInfoGrid}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Grid item>
            <Avatar src={thread.user.avatar_url} />
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.primaryTypography}>
              {thread.user.display_name}
            </Typography>
            <Typography className={classes.typography}>
              {t('course.threads.updated')}
              &nbsp;
              <TimeAgo
                date={GetDateInMilliSeconds(thread.last_updated)}
                formatter={formatter}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <MarkdownRenderer>
          {thread.body}
        </MarkdownRenderer>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <VoteButtons
              {...getVoteButtonsProps(
                'threads',
                thread.id,
                threadVote[thread.id],
                setThreadVote,
                threadScore[thread.id],
                setThreadScore,
              )}
            />
          </Grid>
          <Grid item>
            <IconButton aria-label="comment" onClick={handleCommentTextFieldOpen}>
              <CommentIcon />
            </IconButton>
          </Grid>
          {isStudent || (
            <Grid item>
              <IconButton aria-label="edit" onClick={redirectToEditThread}>
                <EditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {t('course.threads.comments')}
          &nbsp;
          {comments.length}
        </Typography>
      </Grid>
      <Grid item>
        <CommentTextField open={isCommentTextfieldOpen} />
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-evenly" spacing={3}>
          {
            comments.length > 0
              ? (
                comments.map((comment) => (
                  <Grid item key={comment.id}>
                    <Paper>
                      <CommentBlock
                        comment={comment}
                        setIsReplyTextfieldOpen={setIsReplyTextfieldOpen}
                        voteButtonsProps={getVoteButtonsProps(
                          'comments',
                          comment.id,
                          commentVotes[comment.id],
                          setCommentVotes,
                          commentScores[comment.id],
                          setCommentScores,
                        )}
                      />
                      <Grid
                        className={classes.replyCommentTextfield}
                        container
                        direction="column"
                        spacing={1}
                      >
                        {
                          comment.comments.length > 0 && comment.comments.map((reply) => (
                            <Grid key={reply.id} item className={classes.replyCommentGridItem}>
                              <CommentBlock
                                comment={reply}
                                parentCommentId={comment.id}
                                setIsReplyTextfieldOpen={setIsReplyTextfieldOpen}
                                voteButtonsProps={getVoteButtonsProps(
                                  'comments',
                                  reply.id,
                                  commentVotes[reply.id],
                                  setCommentVotes,
                                  commentScores[reply.id],
                                  setCommentScores,
                                )}
                              />
                            </Grid>
                          ))
                        }
                        <Grid item className={classes.replyCommentGridItem}>
                          <CommentTextField
                            open={isReplyTextfieldOpen[comment.id]}
                            parentCommentId={comment.id}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))
              )
              : (
                <Grid item>
                  <Typography>
                    {t('course.threads.noComment')}
                  </Typography>
                </Grid>
              )
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

ThreadShow.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ThreadShow);
