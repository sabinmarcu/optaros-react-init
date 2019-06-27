import React from 'react';
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core';

const MovieComponent = ({
    movie: {
        title,
        year,
        genre,
        plot,
        poster,
    }
}) => (
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
</Card>
);

export default MovieComponent;