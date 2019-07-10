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
  const [ownComment, setOwnComment] = useState('');
  
  const [handlers, setHandlers] = useState({});
  useEffect(
    () => setHandlers({
      resetComment: () => setOwnComment(''),
      saveComment() {
        onSave(ownComment);
        setOwnComment('');
      },
      deleteComment: () => onSave(''),
      eventHandler: ({ target: { value } }) =>
        setOwnComment(value)
    }),
    [ownComment, onSave],
  )

  const commentValid = useValid(comment);
  const ownCommentValid = useValid(ownComment);

  return {
    commentValid,
    ownCommentValid,
    ownComment,
    ...handlers,
  }
}
