import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoviesList from './components/MovieList';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './data/theme';
import { Button } from '@material-ui/core';
import { useLanguage, useLanguageProvider } from './hooks/useLanguage';

const Title = () => {
  const t = useLanguage();
  return (
    <Typography variant="h6" color="inherit">
      {t('Movies App')}
    </Typography>
  );
}

const LanguageButton = ({
  setLanguage,
  language,
  value,
  text,
}) => (
    <Button 
      variant={language === value ? 'outlined' : 'text'} 
      onClick={
      () => setLanguage(value)
      }
    >
      {text}
    </Button>
);

const App = () => {
  const [language, LanguageProvider, setLanguage] = useLanguageProvider();
    return (
    <div className="app">
      <LanguageProvider>
          <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
              <Toolbar style={{ justifyContent: "space-between" }}>
                <Title />
                <Typography>
                  <LanguageButton 
                    {...{language, setLanguage}}
                    value="en_US"
                    text="English"
                  /> 
                    /
                  <LanguageButton
                    {...{ language, setLanguage }}
                    value="ro_RO"
                    text="Romanian"
                  /> 
                </Typography>
              </Toolbar>
            </AppBar>
            <MoviesList />
          </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
