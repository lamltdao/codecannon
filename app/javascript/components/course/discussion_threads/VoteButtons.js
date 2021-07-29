import React from 'react';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';

const VoteButtons = (props) => {
  const {
    enqueueSnackbar,
    votableType,
    votableId,
    vote,
    setVotes,
    score,
    setScores,
  } = props;
  const { course } = window.gon;
  const { id: courseId } = course;

  const handleVote = (e, type, id, voteValue, endpoint) => {
    e.preventDefault();
    axios({
      url: `/courses/${courseId}/${type}/${id}/${endpoint}`,
      method: 'PUT',
      headers: AxiosHeader,
    })
      .then(({ data }) => {
        const updatedScore = data.response;
        setScores((curScores) => ({ ...curScores, [id]: updatedScore }));
        setVotes((curVotes) => ({ ...curVotes, [id]: voteValue }));
      })
      .catch(({ response }) => {
        response.data.errors.forEach((error) => {
          PushSnackbarMessage(enqueueSnackbar, error, 'error');
        });
      });
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <IconButton onClick={(e) => { handleVote(e, votableType, votableId, 'Upvoted', 'upvote'); }}>
          <ThumbUpIcon color={vote === 'Upvoted' ? 'primary' : 'inherit'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>
          {score}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={(e) => { handleVote(e, votableType, votableId, 'Downvoted', 'downvote'); }}>
          <ThumbDownIcon color={vote === 'Downvoted' ? 'primary' : 'inherit'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

VoteButtons.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  vote: PropTypes.string.isRequired,
  setVotes: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScores: PropTypes.func.isRequired,
  votableType: PropTypes.string.isRequired,
  votableId: PropTypes.number.isRequired,
};

export default withSnackbar(VoteButtons);
