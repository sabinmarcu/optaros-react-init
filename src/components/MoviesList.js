import React, { Component } from 'react';
import MovieComponent from './Movie';
import { movies } from '../data/movies';
import styles from './MoviesList.module.css';

class MoviesList extends Component {
    render() {
        return (
            <div className={styles.list}>
                {movies.map(({ id, ...rest }) => 
                    <div className={styles.movie} key={id}>
                        <MovieComponent movie={{ id, ...rest }} />
                    </div>
                )}
            </div>
        )
    }
}

export default MoviesList;