import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core';

class MovieComponent extends Component {
    render() {
        const {
            movie: {
                title,
                year,
                genre,
                plot,
                poster,
            }
        } = this.props;
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
            </Card>
        );
    }
}

export default MovieComponent;