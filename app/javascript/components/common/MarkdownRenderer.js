import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import { ALLOWED_MARKDOWN_ELEMENTS } from '../../shared/Constants';

const styles = () => ({
  typography: {
    textAlign: 'justify',
    wordBreak: 'break-word',
    '& blockquote': {
      background: '#f9f9f9',
      borderLeft: '10px solid #ccc',
      margin: '1.5em 10px',
      padding: '1em 10px .1em 10px',
    },
  },
});

const MarkdownRenderer = (props) => {
  const { classes, children } = props;
  return (
    <Typography className={classes.typography} component="div">
      <ReactMarkdown
        allowedElements={ALLOWED_MARKDOWN_ELEMENTS}
        unwrapDisallowed
      >
        {children}
      </ReactMarkdown>
    </Typography>
  );
};

MarkdownRenderer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MarkdownRenderer);
