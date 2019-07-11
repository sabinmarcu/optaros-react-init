import React from 'react';
import {
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';
import { useComment } from '../hooks/useComment';
import { useLanguage } from '../hooks/useLanguage';

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
  const t = useLanguage();
  return (
    <CardActions>
      <TextField
        fullWidth
        placeholder={t("Your Comment")}
        value={ownComment}
        onChange={eventHandler}
      />
      {ownCommentValid &&
        <Button onClick={saveComment} color="primary" variant="contained">
          {commentValid
            ? t('Update')
            : t('Add Comment')
          }
        </Button>
      }
      {ownCommentValid &&
        <Button onClick={resetComment} color="secondary" variant="outlined">
          {t('Reset')}
        </Button>
      }
      {commentValid &&
        <Button onClick={deleteComment} color="secondary">
          {t('Delete Comment')}
        </Button>
      }
    </CardActions>
  );
}

export default CommentForm;
