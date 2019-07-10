import React from 'react';
import MovieComponent from './Movie';
import styles from './MovieList.module.css';
import { useSelector } from 'react-redux';
import { Selectors } from '../redux/movies';

const MovieList = () => {
  const ids = useSelector(Selectors.ids);
  return (
    <div className={styles.list}>
      {ids.map(id => (
        <div className={styles.movie} key={id}>
          <MovieComponent id={id} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;