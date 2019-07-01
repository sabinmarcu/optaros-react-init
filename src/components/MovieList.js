import React from 'react';
import MovieComponent from './Movie';
import { movies } from '../data/movies.json';
import styles from './MovieList.module.css';

const MovieList = () => (
  <div className={styles.list}>
    {movies.map(({id, ...rest}) => (
      <div className={styles.movie} key={id}>
        <MovieComponent {...{id, ...rest}} />
      </div>
    ))}
  </div>
);

export default MovieList;