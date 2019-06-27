import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export const isValid = comment => comment && comment.length > 0;
const useComment = (comment, onSave) => {
    const [ownComment, setOwnComment] = useState(comment);
    const [ownCommentIsValid, setIsValid] = useState(isValid(comment));
    useEffect(
        () => setIsValid(isValid(ownComment)),
        [ownComment],
    );
    const updateParentValue = value => {
        setOwnComment('');
        onSave(value);
    };
    const updateHandler = ({ target: { value } }) => setOwnComment(value);
    return {
        ownComment,
        ownCommentIsValid,
        updateParentValue,
        updateHandler,
    };
}

export default useComment;