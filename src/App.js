import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoviesList from './components/MovieList';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './data/theme';

const App = () => (
  <div className="app">
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Movies App
        </Typography>
      </Toolbar>
    </AppBar>
    <MoviesList />
    </ThemeProvider>
  </div>
);

export default App;
