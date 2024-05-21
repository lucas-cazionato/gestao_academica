import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const icons: { name: string; page: keyof StackParamList }[] = [
    { name: 'person-outline', page: 'UpdateProfile' },
    { name: 'library-outline', page: 'Subject' },
    { name: 'calendar-outline', page: 'Schedule' },
    { name: 'star-outline', page: 'Grade' },    
    { name: 'trending-down-outline', page: 'Frequency' },
    { name: 'pencil-outline', page: 'Test' },
    { name: 'book-outline', page: 'Assigment' },
    { name: 'clipboard-outline', page: 'Report' }    
  ];

  return (
    <SafeAreaView>
      <View>
        <Text>EduCare</Text>
      </View>
      <View style={styles.grid}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(icon.page)}>
            <Ionicons name={icon.name} size={50} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text>Próximas Datas</Text>
      </View>
      <View>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 30,
  }
});

export default Home;