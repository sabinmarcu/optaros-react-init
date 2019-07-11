import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoviesList from './components/MovieList';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './data/theme';
import {
  Button,
} from '@material-ui/core';

import {
  useLanguage,
  useLanguageProvider 
} from './hooks/useLanguage';

import { Provider as ReduxProvider } from 'react-redux';
import store from './redux';

const Title = () => {
  const t = useLanguage();
  return (
    <Typography variant="h6" color="inherit">
      {t("Movies App")}
    </Typography>
  );
}

const LanguageButton = ({
  language,
  setLanguage,
  value,
  text,
}) => (
  <Button
    onClick={() => setLanguage(value)}
    variant={language === value ? 'outlined' : 'text'}
  >
    {text}
  </Button>
);

const App = () => {
  const [language, setLanguage, LanguageProvider] = useLanguageProvider();
  return (
    <div className="app">
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <AppBar position="static" color="primary">
              <Toolbar style={{ justifyContent: 'space-between' }}>
                <Title />
                <div>
                  <LanguageButton 
                    value="en_US"
                    text="English"
                    {...{ language, setLanguage }}
                  />
                  <LanguageButton
                    value="ro_RO"
                    text="Romanian"
                    {...{ language, setLanguage }}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <MoviesList />
          </LanguageProvider>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
