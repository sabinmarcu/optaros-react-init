import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import CommentForm from './Comment';
import useLocalStorage from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';

const MovieComponent = ({
  id,
  title,
  year,
  genre,
  plot,
  poster,
}) => {
  const [comment, setComment] = useLocalStorage(id, '');
  const t = useLanguage();
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={`${year} - ${genre}`}
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
        {t("Your comment is")}: {comment}
      </CardContent>}
      <CommentForm comment={comment} onSave={setComment} />
    </Card>
  );
}

export default MovieComponent;
