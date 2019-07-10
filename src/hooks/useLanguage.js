import React, { 
    useState, 
    useEffect, 
    useContext, 
    createContext 
} from 'react';

import roTranslations from '../translations/ro_RO.json';

const languageMap = {
    "en_US": {},
    "ro_RO": roTranslations,
};
const defaultLanguage = "en_US";

const Context = createContext(languageMap[defaultLanguage]);

const makeProvider = set => () => ({ children }) => (
    <Context.Provider value={set}>
        {children}
    </Context.Provider>
);

export const useLanguageProvider = () => {
    const [language, setLanguage] = useState(defaultLanguage);
    const [languageSet, setLanguageSet] = useState(languageMap[defaultLanguage]);
    useEffect(
        () => {
            if (Object.keys(languageMap).includes(language)) {
                setLanguageSet(languageMap[language]);
            } 
        },
        [language],
    )
    const [provider, setProvider] = useState(makeProvider(languageMap[defaultLanguage]));
    useEffect(
        () => {
            setProvider(makeProvider(languageSet))
        },
        [languageSet],
    );
    return [language, provider, setLanguage];
}

const makeTranslateFunction = dict => 
    () => text => dict[text] || text;
export const useLanguage = () => {
    const dict = useContext(Context);
    const [t, setT] = useState(makeTranslateFunction(languageMap[defaultLanguage]));
    useEffect(
        () => {
            setT(makeTranslateFunction(dict))
        },
        [dict],
    );
    return t;
}

export default Context;