import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Button,
} from '@material-ui/core';
import { MovieComponent } from '../components/Movie';
import { useLanguage } from '../hooks/useLanguage';
import useField from '../hooks/useField';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from '../redux/movies';

const useForm = (initData = {}) => {
    const [title, titleIsValid, setTitle] = useField(initData.title);
    const [year, yearIsValid, setYear] = useField(initData.year, value => /^[0-9]+$/.test(value));
    const [genre, genreIsValid, setGenre] = useField(initData.genre);
    const [plot, plotIsValid, setPlot] = useField(initData.plot, value => value.trim().split(' ').length >= 10);
    const [poster, posterIsValid, setPoster] = useField(initData.poster);
    const [isPartialValid, setIsPartialValid] = useState(false);
    const [isValid, setIsValid] = useState(false); 
    useEffect(
        () => {
            setIsValid(
                [titleIsValid, yearIsValid, genreIsValid, posterIsValid]
                    .reduce((prev, it) => prev && it, true)
            );
            setIsPartialValid(
                [titleIsValid, yearIsValid, genreIsValid, posterIsValid]
                    .reduce((prev, it) => prev || it, false)
            );
        },
        [titleIsValid, yearIsValid, genreIsValid, posterIsValid],
    )

    return {
        title, titleIsValid, setTitle,
        year, yearIsValid, setYear,
        genre, genreIsValid, setGenre,
        plot, plotIsValid, setPlot,
        poster, posterIsValid, setPoster,
        isPartialValid, isValid,
    };
}

const MovieForm = ({
    history: { push },
    data,
}) => {
    const t = useLanguage();
    const {
        title, titleIsValid, setTitle,
        year, yearIsValid, setYear,
        genre, genreIsValid, setGenre,
        plot, plotIsValid, setPlot,
        poster, posterIsValid, setPoster,
        isPartialValid, isValid,
    } = useForm(data);
    const dispatch = useDispatch();
    return (
        <div className={styles.formContainer}>
            <Card>
                <CardHeader title={t("Add a movie")} subheader={`Partial: ${isPartialValid}, Valid: ${isValid}`} />
                <CardContent>
                    <TextField
                        placeholder={t("Title")}
                        value={title}
                        fullWidth
                        onChange={setTitle}
                        error={!titleIsValid}
                    />
                    <TextField
                        placeholder={t("Year")}
                        value={year}
                        type="number"
                        fullWidth
                        onChange={setYear}
                        error={!yearIsValid}
                    />
                    <TextField
                        placeholder={t("Genre")}
                        value={genre}
                        fullWidth
                        onChange={setGenre}
                        error={!genreIsValid}
                    />
                    <TextField
                        placeholder={t("Plot")}
                        multiline
                        value={plot}
                        fullWidth
                        onChange={setPlot}
                        error={!plotIsValid}
                    />
                    <TextField
                        placeholder={t("Poster")}
                        value={poster}
                        fullWidth
                        onChange={setPoster}
                        error={!posterIsValid}
                    />
                </CardContent>
                {isValid && <CardActions>
                    <Button 
                        color="primary" 
                        variant="contained"
                        onClick={() => {
                            dispatch(
                                data 
                                    ? Actions.UPDATE(
                                        data.id,
                                        {
                                            title,
                                            genre,
                                            year,
                                            poster,
                                            plot,
                                        }
                                    )

                                    : Actions.ADD({
                                        title,
                                        genre,
                                        year,
                                        poster,
                                        plot,
                                    })
                            );
                            push("/");
                        }}
                    >
                        {t("Save")}
                    </Button>
                </CardActions>}
            </Card>
            {isPartialValid && <MovieComponent isEditing {...{title, year, genre, plot, poster}} />}
        </div>
    )
};

export default MovieForm;
export const ReduxFormRoute = ({ history, match: { params: { id }} }) => {
    const data = useSelector(Selectors.movie(id));
    return <MovieForm {...{history, data}} />
}