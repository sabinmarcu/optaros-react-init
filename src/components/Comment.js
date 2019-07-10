import React from 'react';
import {
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';
import { useComment } from '../hooks/useComment';

const CommentForm = ({
  comment,
  onSave,
}) => {
  const {
    commentValid,
    ownCommentValid,
    ownComment,
    saveComment,
    deleteComment,
    resetComment,
    eventHandler,
  } = useComment(comment, onSave);
  return (
    <CardActions>
      <TextField
        fullWidth
        placeholder="Your Comment"
        value={ownComment}
        onChange={eventHandler}
      />
      {ownCommentValid &&
        <Button onClick={saveComment} color="primary" variant="contained">
          {commentValid
            ? 'Update'
            : 'Add Comment'
          }
        </Button>
      }
      {ownCommentValid &&
        <Button onClick={resetComment} color="secondary" variant="outlined">
          Reset
        </Button>
      }
      {commentValid &&
        <Button onClick={deleteComment} color="secondary">
          Delete Comment
        </Button>
      }
    </CardActions>
  );
}

export default CommentForm;
