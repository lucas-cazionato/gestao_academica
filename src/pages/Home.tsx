import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';
import styles from './styles/styles';

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const icons: { name: string; label: string; page: keyof StackParamList }[] = [
    { name: 'person-outline', label: 'Atualizar Perfil', page: 'Atualizar Perfil' },
    { name: 'library-outline', label: 'Disciplinas', page: 'Disciplinas' },
    { name: 'star-outline', label: 'Notas', page: 'Notas' },
    { name: 'trending-down-outline', label: 'Frequência', page: 'Frequência' },
    { name: 'pencil-outline', label: 'Provas', page: 'Provas' },
    { name: 'book-outline', label: 'Trabalhos', page: 'Trabalhos' },
  ];

  const handleIconPress = (page: keyof StackParamList) => {
    navigation.navigate(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.grid}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => handleIconPress(icon.page)}>
            <View>
              <View style={styles.iconCircle}>
                <Ionicons name={icon.name} size={50} style={styles.icon} />
              </View>
              <Text style={styles.iconLabel}>{icon.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;