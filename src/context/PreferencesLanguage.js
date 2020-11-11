import {createContext} from 'react';

const PreferencesLanguage= createContext({
    language: '',
    toggleLanguage:()=>{},
});

export default PreferencesLanguage;