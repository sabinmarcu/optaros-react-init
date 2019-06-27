import React, { Component } from 'react';
import {
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions,
    TextField
} from '@material-ui/core';

class MovieComponent extends Component {
    state = {
        comment: '',
    }

    onChangeHandler = ({ target: { value }}) => 
        this.setState({ comment: value })

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
        const { comment } = this.state;
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
                        onChange={this.onChangeHandler}
                    />
                </CardActions>
            </Card>
        );
    }
}

export default MovieComponent;