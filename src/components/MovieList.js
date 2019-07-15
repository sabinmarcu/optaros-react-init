import React, { useEffect } from 'react';
import MovieComponent from './Movie';
import styles from './MovieList.module.css';
import { CircularProgress } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { Selectors, Actions } from '../redux/movies';

import useFetch from 'react-fetch-hook';

const Status = ({ isLoading }) => (
  isLoading ? <CircularProgress /> : <h1>No Data! (ain't pretty, but at least it's right)</h1>
)
const MovieList = () => {
  const ids = useSelector(Selectors.ids);
  const { isLoading, data } = useFetch("http://localhost:8000/movies");
  const dispatch = useDispatch();
  useEffect(
    () => {
      data && dispatch(Actions.INIT(data));
    },
    [data, dispatch],
  );
  return (
    <div className={styles.list}>
      {ids && ids.length > 0
        ? ids.map(id => (
          <div className={styles.movie} key={id}>
            <MovieComponent id={id} />
          </div>
        ))
        : <Status isLoading={isLoading} />
      }
    </div>
  );
};

export default MovieList;