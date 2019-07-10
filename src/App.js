import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './data/theme';
import { Button } from '@material-ui/core';
import { useLanguage, useLanguageProvider } from './hooks/useLanguage';
import { Provider } from 'react-redux';
import store from './redux';

import { 
  BrowserRouter as Router, 
  Route,
  Link, 
} from "react-router-dom";
import HomeRoute from './routes/home';
import FormRoute, { ReduxFormRoute } from './routes/form';

const BrowserButton = ({ to, ...rest }) => (
  <Link to={to}>
    <Button {...rest} />
  </Link>
)

const Title = () => {
  const t = useLanguage();
  return (
    <Typography variant="h6" color="inherit">
      <BrowserButton to="/">{t("Home")}</BrowserButton>
      /
      <BrowserButton to="/add">{t("Add")}</BrowserButton>
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
      <Provider store={store}>
        <LanguageProvider>
            <ThemeProvider theme={theme}>
              <Router>
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
                <Route exact path="/" component={HomeRoute} />
                <Route exact path="/add" component={FormRoute} />
                <Route exact path="/edit/:id" component={ReduxFormRoute} />
              </Router>
            </ThemeProvider>
        </LanguageProvider>
      </Provider> 
    </div>
  );
}

export default App;
