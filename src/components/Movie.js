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

const MovieComponent = ({
  id,
}) => {
  const [comment, setComment] = useLocalStorage(id, '');
  const t = useLanguage();
  const {
    title,
    year,
    genre,
    plot,
    poster,
  } = useSelector(Selectors.movie(id));
  const dispatch = useDispatch();
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={`${year} - ${genre}`}
        action={(
          <IconButton onClick={() => confirm("Are you sure?") && dispatch(Actions.REMOVE(id))}>
            <ClearIcon />
          </IconButton>
        )}
      />
      <CardMedia
        title={title}
        style={{ height: 50 * 6 }}
        image={poster}
      />
      <CardContent>
        {plot}
      </CardContent>
      {comment && comment.length > 0 && <CardContent>
        {t('Your comment is')}: {comment}
      </CardContent>}
      <CommentForm comment={comment} onSave={setComment} />
    </Card>
  );
}

export default MovieComponent;
