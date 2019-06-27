import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core';

class MovieComponent extends Component {
    render() {
        return (
            <Card>
                <CardHeader 
                    title="Star Wars: The Last Jedi" 
                    subheader="2017 - Action, Adventure, Fantasy" 
                />
                <CardMedia 
                    style={{height: 300}}
                    image="https://images-na.ssl-images-amazon.com/images/I/51ih4cPagFL.jpg" 
                    title="Star Wars: The Last Jedi"
                />
                <CardContent>
                    <Typography>
                    Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default MovieComponent;