import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;  
  
  // botón para desplegar barra lateral
  const buttonLeft = (screen) => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );   
      default:
        return (
        <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
    
  };
  
  // boton para realizar búsqueda
  const buttonRight=()=> {
    return <IconButton icon="magnify" onPress={()=> navigation.navigate('search')} />
  };

  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="home"
        component={Home}
        options={{title: 'TOP RATED', 
        headerLeft: () => buttonLeft("home"),
        headerRight: () => buttonRight()}}
      /> 
      
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{title: '',
        headerTransparent: true, 
        headerLeft: () => buttonLeft("movie"),
        headerRight: () => buttonRight()}}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'POPULAR MOVIES ',
          headerLeft: () => buttonLeft("popular"),
        headerRight: () => buttonRight()
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: '', headerLeft: () => buttonLeft("search")}}
      />
    </Stack.Navigator>
  );

  
}
