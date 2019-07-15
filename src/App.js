import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoviesList from './components/MovieList';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

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

import FormRoute, { ReduxMovieForm } from './routes/form';
import Logger from './routes/logs';


const LinkButton = ({ to, ...rest }) => (
  <Link to={to}>
    <Button {...rest} />
  </Link>
);

const Title = () => {
  const t = useLanguage();
  return (
    <div>
      <LinkButton to="/">{t("Home")}</LinkButton>
      <LinkButton to="/add">{t("Add")}</LinkButton>
    </div>
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
            <Router>
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
              <Switch>
                <Route exact path="/" component={MoviesList} />
                <Route exact path="/add" component={FormRoute} />
                <Route exact path="/edit/:id" component={ReduxMovieForm} />
                <Route exact path="/logs" component={Logger}/>
                <Route path="/" component={() => <h1>404</h1>} />
              </Switch>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
