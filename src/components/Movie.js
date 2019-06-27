import React, { useState } from 'react';
import {
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    Typography, 
} from '@material-ui/core';
import CommentForm from './Comment';

const MovieComponent = ({
    movie: {
        title,
        year,
        genre,
        plot,
        poster,
    }
}) => {
    const [comment, setComment] = useState('');
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
            <CommentForm comment={comment} onSave={setComment} />
        </Card>
    );
};

export default MovieComponent;