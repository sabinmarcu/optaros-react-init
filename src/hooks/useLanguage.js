import React, { useState, useEffect, createContext, useContext } from 'react';

import roTranslation from  '../translations/ro_RO.json';

export const languageMap = {
  en_US: {},
  ro_RO: roTranslation,
}
const defaultLanguage = 'en_US';

export const Context = createContext(languageMap[defaultLanguage]);
const makeProvider = dict => 
  () => ({ children }) => (
    <Context.Provider value={dict}>
      {children}
    </Context.Provider>
  );

export const useLanguageProvider = () => {
  const [language, setLanguage] = useState(defaultLanguage);

  const [dict, setDict] = useState(languageMap[defaultLanguage]);
  useEffect(
    () => languageMap[language] && setDict(languageMap[language]),
    [language],
  );

  const [provider, setProvider] =
    useState(makeProvider(languageMap[defaultLanguage]));
  useEffect(
    () => setProvider(makeProvider(dict)),
    [dict],
  );

  return [language, setLanguage, provider];
}

const makeTranslateFunction = dict =>
  () => value => dict[value] || value;

export const useLanguage = () => {
  const dict = useContext(Context);
  const [t, setT] = useState(makeTranslateFunction(dict));
  useEffect(
    () => setT(makeTranslateFunction(dict)),
    [dict],
  );
  return t;
}