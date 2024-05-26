import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Assigment from '../Assigment';
import Frequency from '../Frequency';
import Grade from '../Grade';
import Home from '../Home';
import Login from '../Login';
import Schedule from '../Schedule';
import Subject from '../Subject';
import Test from '../Test';
import UpdateProfile from '../UpdateProfile';

const Drawer = createDrawerNavigator();

const NavBar: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Página Inicial">
      <Drawer.Screen name="Página Inicial" component={Home} 
        options={{ 
          drawerLabel: 'Página Inicial', 
          drawerIcon: ({ color, size }) => (<Ionicons name="home" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Atualizar Perfil" component={UpdateProfile}
        options={{ 
          drawerLabel: 'Atualizar Perfil', 
          drawerIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Disciplinas" component={Subject}
        options={{ 
          drawerLabel: 'Disciplinas', 
          drawerIcon: ({ color, size }) => (<Ionicons name="library" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Calendário" component={Schedule}
        options={{ 
          drawerLabel: 'Calendário', 
          drawerIcon: ({ color, size }) => (<Ionicons name="calendar" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Notas" component={Grade}
        options={{ 
          drawerLabel: 'Notas', 
          drawerIcon: ({ color, size }) => (<Ionicons name="star" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Frequência" component={Frequency}
        options={{ 
          drawerLabel: 'Frequência', 
          drawerIcon: ({ color, size }) => (<Ionicons name="trending-down" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Provas" component={Test}
        options={{ 
          drawerLabel: 'Provas', 
          drawerIcon: ({ color, size }) => (<Ionicons name="pencil" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="Trabalhos" component={Assigment}
        options={{ 
          drawerLabel: 'Trabalhos', 
          drawerIcon: ({ color, size }) => (<Ionicons name="book" size={size} color={color} />), 
        }}
      />
      <Drawer.Screen name="EduCare" component={Login}
        options={{ 
          drawerLabel: 'Sair', 
          drawerIcon: ({ color, size }) => (<Ionicons name="log-out" size={size} color={color} />), 
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavBar;