/* eslint-disable no-restricted-globals */

import React from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import CommentForm from './Comment';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';

import { useSelector, useDispatch } from 'react-redux';
import { Selectors, Actions } from '../redux/movies';

export const MovieComponent = ({
  id,
  title,
  year,
  genre,
  plot,
  poster,
  isPreview,
}) => {
  const [comment, setComment] = useLocalStorage(id, '');
  const t = useLanguage();
  const dispatch = useDispatch();
  return (
    <Card>
      {(title || year || genre) && <CardHeader
        title={title}
        subheader={`${year} - ${genre}`}
        action={!isPreview && (
          <IconButton onClick={() => confirm("Are you sure?") && dispatch(Actions.REMOVE(id))}>
            <ClearIcon />
          </IconButton>
        )}
      />}
      {poster && <CardMedia
        title={title}
        style={{ height: 50 * 6 }}
        image={poster}
      />}
      {plot && <CardContent>
        {plot}
      </CardContent>}
      {!isPreview && comment && comment.length > 0 && <CardContent>
        {t('Your comment is')}: {comment}
      </CardContent>}
      {!isPreview && <CommentForm comment={comment} onSave={setComment} />}
    </Card>
  );
}

export default ({ id }) => {
  const data = useSelector(Selectors.movie(id));
  return (<MovieComponent {...{id, ...data}} />);
};
