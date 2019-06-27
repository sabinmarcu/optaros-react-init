import React, { Component } from 'react';
import MovieComponent from './Movie';
import { movies } from '../data/movies';
import styles from './MoviesList.module.css';

class MoviesList extends Component {
    render() {
        return (
            <div className={styles.list}>
                {movies.map(movie => <div className={styles.movie}>
                    <MovieComponent movie={movie} />
                </div>)}
            </div>
        )
    }
}

export default MoviesList;