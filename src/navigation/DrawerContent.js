import React, {useState,useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer, Switch, TouchableRipple, Text} from "react-native-paper";
import usePreference from "../hooks/usePreferences";
import useLanguage from "../hooks/useLanguage";

export default function DrawerContent(props) {
  const {navigation}=props;
  const [active, setActive] = useState('home');
  const {theme, toggleTheme}= usePreference();
  const {language, toggleLanguage}= useLanguage();


  // Accion al presionar cualquier pestaña de la barra lateral
  const onChangeScreen=(screen)=>{
    setActive(screen);
    navigation.navigate(screen);
  }
  

   //Pestañas de la barra lateral
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item 
          label={language === 'en-US' ? 'Top Rated' : 'Mejor Calificada'}
          // si se encuentra en home, la pestaña home se encuentra activa
          active={active ==="home"} 
          // cuando se presiona home se dirige a la ventana home
          onPress={()=> onChangeScreen('home')}/>
        <Drawer.Item 
          label={language === 'en-US' ? "Popular Movies" :  "Películas Populares"}
          active={active ==="popular"} 
          onPress={()=> onChangeScreen('popular')}/>
      </Drawer.Section>
      <Drawer.Section title={language === 'en-US' ? "Options" : "Opciones"}>
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>{language === 'en-US' ? "Dark Theme" : "Tema Oscuro"}</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>{language === 'en-US' ? "Language  Spanish/English" : "Idioma Español/Inglés"}</Text>
            <Switch value={language === 'en-US'} onValueChange={toggleLanguage} />
          </View>
        </TouchableRipple>
        
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
});
