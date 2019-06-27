import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoviesList from './components/MoviesList';

const App = () => (
  <div className="app">
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Movies App
        </Typography>
      </Toolbar>
    </AppBar>
    <MoviesList />
  </div>
);

export default App;
