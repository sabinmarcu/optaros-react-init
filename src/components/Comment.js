import React, { useState, useEffect } from 'react';
import {
    CardActions,
    TextField,
    Button,
} from '@material-ui/core';

const isValid = comment => comment && comment.length > 0;
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
    const updateHandler = ({target: { value }}) => setOwnComment(value);
    return {
        ownComment,
        ownCommentIsValid,
        updateParentValue,
        updateHandler,
    };
}

const CommentForm = ({
    comment,
    onSave,
}) => {
    const hasCommentSaved = isValid(comment);
    const { 
        ownComment, 
        ownCommentIsValid, 
        updateParentValue,
        updateHandler,
    } = useComment(comment, onSave);
    return (
        <CardActions>
            <TextField 
                fullWidth
                label="Comment"
                value={ownComment}
                onChange={updateHandler}
            />
            <Button 
                color="primary" 
                variant={ownCommentIsValid ? 'contained' : 'text'} 
                onClick={() => updateParentValue(ownComment)}
            >
                {hasCommentSaved > 0 ? 'Update' : 'Save'}
            </Button>
            {ownComment && ownComment.length > 0 && 
                <Button 
                    color="secondary"
                    onClick={() => updateParentValue('')}
                >
                    Reset
                </Button>
            }
            {hasCommentSaved && 
                <Button 
                    color="secondary"
                    variant="contained"
                    onClick={() => updateParentValue('')}
                >
                    Remove
                </Button>
            }
        </CardActions>
    )
}

export default CommentForm;