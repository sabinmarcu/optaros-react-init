import React, { Component } from 'react';
import { 
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
} from '@material-ui/core';

class MovieComponent extends Component {
  state = {
    comment: ''
  }
  render() {
    const {
      title,
      year,
      genre,
      plot,
      poster,
    } = this.props;
    const { comment } = this.state;
    return (
      <Card>
        <CardHeader 
          title={title}
          subheader={`${year} - ${genre}`}
        />
        <CardMedia
          title={title}
          style={{ height: 50 * 6 }}
          image={poster}
        />
        <CardContent>
          {plot}
        </CardContent>
        {comment && comment.length > 0 && <CardContent>
          Your comment is: {comment}
        </CardContent>}
        <CardActions>
          <TextField 
            fullWidth
            placeholder="Your Comment"
            value={comment}
            onChange={({ target: { value }}) => this.setState({ comment: value })}
          />
        </CardActions>
      </Card>
    );
  }
}

export default MovieComponent;