import React, { useState } from 'react';
import {
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions,
    TextField
} from '@material-ui/core';

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
                <CardActions>
                    <TextField 
                        fullWidth
                        label="Comment"
                        value={comment}
                        onChange={({ target: { value }}) => setComment(value)}
                    />
                </CardActions>
        </Card>
    );
};

export default MovieComponent;