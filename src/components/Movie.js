/* eslint-disable no-restricted-globals */

import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import CommentForm from './Comment';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';
import { Selectors } from '../redux/movies';
import Clear from '@material-ui/icons/Clear';
import MoreVert from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { Actions } from '../redux/movies';
import useReactRouter from 'use-react-router';

export const MovieComponent = ({
  id, title,
  year,
  genre,
  plot,
  poster,
  isEditing,
}) => {
  const [comment, setComment] = useLocalStorage(id, '');
  const t = useLanguage();
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  return (
    <Card>
      {(title || year || genre) && <CardHeader
        title={title}
        subheader={`${year} - ${genre}`}
        action={!isEditing && <div>
            <IconButton onClick={
              () => history.push(`/edit/${id}`)
            }>
              <MoreVert />
            </IconButton>
            <IconButton onClick={
              () => confirm(`${t("Are you sure")}?`) && dispatch(
                Actions.REMOVE(id)
              )
            }>
              <Clear />
            </IconButton>
          </div>}
      />}
      {poster && <CardMedia
        title={title}
        style={{ height: 50 * 6 }}
        image={poster}
      />}
      {plot && <CardContent>
        {plot}
      </CardContent>}
      {comment && comment.length > 0 && <CardContent>
        {t("Your comment is")}: {comment}
      </CardContent>}
      {!isEditing && <CommentForm comment={comment} onSave={setComment} />}
    </Card>
  );
}

const ReduxMovieComponentWrapper = ({ id }) => {
  const movieData = useSelector(Selectors.movie(id))
  return (<MovieComponent {...{ id, ...movieData }} />)
};

export default ReduxMovieComponentWrapper;
