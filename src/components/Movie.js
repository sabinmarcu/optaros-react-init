import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import CommentForm from './Comment';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';
import { Selectors } from '../redux/movies';

export const MovieComponent = ({
  id, title,
  year,
  genre,
  plot,
  poster,
  displayComment,
}) => {
  const [comment, setComment] = useLocalStorage(id, '');
  const t = useLanguage();
  return (
    <Card>
      {(title || year || genre) && <CardHeader
        title={title}
        subheader={`${year} - ${genre}`}
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
      {displayComment && <CommentForm comment={comment} onSave={setComment} />}
    </Card>
  );
}

const ReduxMovieComponentWrapper = ({ id }) => {
  const movieData = useSelector(Selectors.movie(id))
  return (<MovieComponent displayComment {...{ id, ...movieData }} />)
};

export default ReduxMovieComponentWrapper;
