import React, {useState,useMemo} from 'react';
import {StatusBar} from "react-native";
import {
  Provider as PaperProvider, 
  DarkTheme as DarkThemePaper, 
  DefaultTheme as DefaultThemePaper
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';
import PreferencesLanguage from './src/context/PreferencesLanguage';

export default function App() {

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en-US');
  
  // Se definen los colores para el tema oscuro
  DefaultThemePaper.colors.primary='#1ae1f2';
  DarkThemePaper.colors.primary='#1ae1f2';
  DarkThemePaper.colors.accent='#1ae1f2';

  DarkThemeNavigation.colors.background='#192734';
  DarkThemeNavigation.colors.card='#15212b';

  // se crea el toggle para selección de tema
  const toggleTheme = ()=>{
    setTheme(theme === 'dark' ? 'light' : 'dark'); 
  };

  // se crea función que guardará el estado del tema
  const preferences= useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
    )

  // se crea el toggle para selección de idioma
  const toggleLanguage = ()=>{
    setLanguage(language === 'en-US' ? 'es-ES' : 'en-US'); 
  };

  // se crea función que guardará el idioma
  const preferencesLanguage= useMemo(
    () => ({
      toggleLanguage,
      language,
    }),
    [language],
    )


  return (
    <PreferencesLanguage.Provider value={preferencesLanguage}>
    <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper} >
        <StatusBar barStyle={theme=== "dark" ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
    </PreferencesLanguage.Provider>
  );
}

