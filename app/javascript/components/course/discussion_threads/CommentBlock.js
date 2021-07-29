import React from 'react';
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
import Typography from '@material-ui/core/Typography';
import ReplyIcon from '@material-ui/icons/Reply';
import GetDateInMilliSeconds from '../../../helpers/GetDateInMilliSeconds';
import VoteButtons from './VoteButtons';

const styles = (theme) => ({
  primaryTypography: {
    color: theme.palette.primary.main,
  },
  commentBody: {
    whiteSpace: 'pre-line',
  },
});

const CommentBlock = (props) => {
  const { i18n } = useTranslation();
  const formatter = i18n.language === 'vn' ? buildFormatter(vietnameseStrings) : buildFormatter(englishStrings);
  const {
    classes,
    comment,
    parentCommentId,
    setIsReplyTextfieldOpen,
    voteButtonsProps,
  } = props;

  const handleReplyTextfieldOpen = (e, commentId) => {
    e.preventDefault();
    setIsReplyTextfieldOpen((curState) => (
      { ...curState, [commentId]: !curState[commentId] }
    ));
  };

  const mainCommentId = parentCommentId || comment.id;

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={1}>
        <Avatar src={comment.author.avatar_url} />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={3}>
              <Grid item>
                <Typography variant="h5" className={classes.primaryTypography}>
                  {comment.author.display_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <TimeAgo
                    date={GetDateInMilliSeconds(comment.last_updated)}
                    formatter={formatter}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.commentBody}>
              {comment.body}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <VoteButtons
                  {...voteButtonsProps}
                />
              </Grid>
              <Grid item>
                <IconButton aria-label="reply" onClick={(e) => { handleReplyTextfieldOpen(e, mainCommentId); }}>
                  <ReplyIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CommentBlock.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  comment: PropTypes.instanceOf(Object).isRequired,
  setIsReplyTextfieldOpen: PropTypes.func.isRequired,
  parentCommentId: PropTypes.number,
  voteButtonsProps: PropTypes.instanceOf(Object).isRequired,
};

CommentBlock.defaultProps = {
  parentCommentId: null,
};

export default withStyles(styles)(CommentBlock);
