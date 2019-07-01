import { useState, useEffect } from 'react';

export const isValid = text => text && text.length > 0;

export const useValid = value => {
  const [valueIsValid, setIsValid] =
    useState(isValid(value));

  useEffect(
    () => setIsValid(isValid(value)),
    [value],
  );

  return valueIsValid;
}

export const useComment = (comment, onSave) => {
  const [ownComment, setOwnComment] = useState(comment);

  const resetComment = () => setOwnComment('');
  const saveComment = () => {
    onSave(ownComment);
    resetComment();
  }
  const deleteComment = () => onSave('');

  const eventHandler = ({ target: { value }}) =>
    setOwnComment(value);

  const commentValid = useValid(comment);
  const ownCommentValid = useValid(ownComment);

  return {
    commentValid,
    ownCommentValid,
    ownComment,
    saveComment,
    deleteComment,
    resetComment,
    eventHandler,
  }
}
