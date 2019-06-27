import React, { useState } from 'react';
import {
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    Typography, 
} from '@material-ui/core';
import CommentForm from './Comment';
import useLocalStorage from '../hooks/useLocalStorage';

const MovieComponent = ({
    movie: {
        title,
        year,
        genre,
        plot,
        poster,
        id,
    }
}) => {
    const [comment, setComment] = useLocalStorage(id, '');
    return (
        <Card>
            <CardHeader 
                title={title}
                subheader={`${year} - ${genre}`}
            />
            <CardMedia 
                style={{height: 300}}
                image={poster}
                title={title}
            />
            <CardContent>
                <Typography>
                    {plot}
                </Typography>
            </CardContent>
            {comment && comment.length > 0 && 
                <CardContent>
                    Your Comment: {comment}
                </CardContent>
            }
            <CommentForm id={id} comment={comment} onSave={setComment} />
        </Card>
    );
};

export default MovieComponent;