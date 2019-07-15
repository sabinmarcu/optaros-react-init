import React, { useState, useEffect } from 'react';
import useField from '../hooks/useField';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';

import { MovieComponent } from '../components/Movie';

import styles from './style.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from '../redux/movies';

const useForm = (initData = {}) => {
  const [titleValue, titleValid, titleSetter] = useField(initData.title);
  const [genreValue, genreValid, genreSetter] = useField(initData.genre);
  const [yearValue, yearValid, yearSetter] = useField(initData.year);
  const [plotValue, plotValid, plotSetter] = useField(
    initData.plot,
    plot => plot.trim().split(" ").length > 4,
  );
  const [posterValue, posterValid, posterSetter] = useField(initData.poster);

  const [isPartialValid, setIsPartialValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(
    () => {
      setIsPartialValid(
        [titleValid, genreValid, yearValid, plotValid, posterValid].reduce(
          (prev, current) => prev || current,
          false, 
        )  
      );
      setIsValid(
        [titleValid, genreValid, yearValid, plotValid, posterValid].reduce(
          (prev, current) => prev && current,
          true,
        )
      );
    },
    [titleValid, genreValid, yearValid, plotValid, posterValid],
  );

  return {
    titleValue, titleValid, titleSetter,
    genreValue, genreValid, genreSetter,
    yearValue, yearValid, yearSetter,
    plotValue, plotValid, plotSetter,
    posterValue, posterValid, posterSetter,
    isPartialValid, isValid,
  };
}

const MovieForm = ({
  history: {
    push,
  },
  data = {},
  id,
}) => {
  const {
    titleValue, titleValid, titleSetter,
    genreValue, genreValid, genreSetter,
    yearValue, yearValid, yearSetter,
    plotValue, plotValid, plotSetter,
    posterValue, posterValid, posterSetter,
    isPartialValid, isValid,
  } = useForm(data);
  const dispatch = useDispatch();
  return (
    <div className={styles.formContainer}>
      <Card>
        <CardHeader
          title="Add a new Movie"
          subheader={`Partial: ${isPartialValid}, Valid: ${isValid}`}
        />
        <CardContent>
          <TextField
            placeholder="Title"
            value={titleValue}
            error={!titleValid}
            onChange={titleSetter}
            fullWidth
          />
          <TextField
            placeholder="Genre"
            value={genreValue}
            error={!genreValid}
            onChange={genreSetter}
            fullWidth
          />
          <TextField
            placeholder="Year"
            value={yearValue}
            error={!yearValid}
            onChange={yearSetter}
            fullWidth
            type="number"
          />
          <TextField
            placeholder="Plot"
            value={plotValue}
            error={!plotValid}
            onChange={plotSetter}
            fullWidth
            multiline
          />
          <TextField
            placeholder="Poster"
            value={posterValue}
            error={!posterValid}
            onChange={posterSetter}
            fullWidth
          />
        </CardContent>
        {isValid && <CardActions>
          <Button 
            color="primary" 
            variant="contained"
            onClick={() => {
              id 
                ? dispatch(Actions.UPDATE(
                    id,
                    {
                      title: titleValue,
                      genre: genreValue,
                      year: yearValue,
                      plot: plotValue,
                      poster: posterValue,
                    }
                  ) 
                )
                : fetch('http://localhost:8000/movies', {
                  method: 'POST',
                  body: JSON.stringify({
                    title: titleValue,
                    genre: genreValue,
                    year: yearValue,
                    plot: plotValue,
                    poster: posterValue,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  }
                })
                  .then(res => res.json())
                  .then((data) =>
                    dispatch(Actions.ADD(data))
                  );
              push('/');
            }}
          >
            Save
          </Button>
        </CardActions>}
      </Card>
      {isPartialValid && <MovieComponent 
        isPreview
        title={titleValue}
        genre={genreValue}
        year={yearValue}
        plot={plotValue}
        poster={posterValue}  
      />}
    </div>
  );
};

export default MovieForm;
export const ReduxMovieForm = ({ 
  match: { params: { id } }, 
  history  
}) => {
  const data = useSelector(Selectors.movie(id));
  return (<MovieForm {...{ data, id, history }} />)
};