import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import AxiosHeader from '../../../helpers/AxiosHeader';
import PushSnackbarMessage from '../../../helpers/PushSnackbarMessage';
import CodecannonTextField from '../../common/CodecannonTextField';

const CommentTextField = (props) => {
  const { t } = useTranslation();
  const [curComment, setCurComment] = useState('');
  const {
    enqueueSnackbar,
    open,
    parentCommentId,
  } = props;
  const {
    thread,
    course,
  } = window.gon;

  const { id: courseId } = course;
  const { id: threadId } = thread;
  const { id: authorId } = thread.user;

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true, block: 'center' });
    }
  }, []);

  const placeholder = parentCommentId
    ? t('course.threads.replyPlaceholder')
    : t('course.threads.commentPlaceholder');
  const handleCommentChange = (e) => {
    e.preventDefault();
    setCurComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const data = new FormData();
    const commentableId = parentCommentId || threadId;
    data.append('comment[body]', curComment);
    data.append('comment[author_id]', authorId);
    data.append('comment[commentable_id]', commentableId);
    const url = parentCommentId
      ? `/courses/${courseId}/comments/${parentCommentId}/reply`
      : `/courses/${courseId}/comments`;
    axios({
      url,
      method: 'POST',
      headers: { ...AxiosHeader, 'Content-Type': 'multipart/form-data' },
      data,
    }).then(() => {
      PushSnackbarMessage(enqueueSnackbar, 'Comment posted !', 'success');
      window.location.reload();
    }).catch(({ response }) => {
      response.data.errors.forEach((d) => {
        PushSnackbarMessage(enqueueSnackbar, d, 'error');
      });
    });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      submitComment(e);
      setCurComment('');
      // so that shift + enter will not move to new line after submitting comment
      e.preventDefault();
    }
  };

  return (
    <>
      {
        open && (
          <CodecannonTextField
            variant="outlined"
            inputRef={setRef}
            multiline
            placeholder={placeholder}
            onChange={handleCommentChange}
            onKeyDown={handleKeyPress}
            value={curComment}
          />
        )
      }
    </>
  );
};

CommentTextField.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  parentCommentId: PropTypes.number,
};
CommentTextField.defaultProps = {
  parentCommentId: null,
};

export default withSnackbar(CommentTextField);
