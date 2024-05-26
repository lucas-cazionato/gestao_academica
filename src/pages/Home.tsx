import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const icons: { name: string; page: keyof StackParamList | null }[] = [
    { name: 'person-outline', page: 'UpdateProfile' },
    { name: 'library-outline', page: 'Subject' },
    { name: 'calendar-outline', page: 'Schedule' },
    { name: 'star-outline', page: 'Grade' },
    { name: 'trending-down-outline', page: 'Frequency' },
    { name: 'pencil-outline', page: 'Test' },
    { name: 'book-outline', page: 'Assigment' },
    { name: 'clipboard-outline', page: null }, // clipboard-outline não navega para outra página
  ];

  const handleIconPress = (page: keyof StackParamList | null) => {
    if (page) {
      navigation.navigate(page);
    } else {
      setModalVisible(true); // Exibe o modal quando o ícone clipboard-outline for pressionado
    }
  };

  const ModalContent = () => (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Gerar Relatório Acadêmico Completo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButtonClose} onPress={() => setModalVisible(false)}>
        <Text style={styles.modalButtonText}>X</Text>
      </TouchableOpacity>    
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.grid}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => handleIconPress(icon.page)}>
            <Ionicons name={icon.name} size={50} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Próximas Datas</Text>
        <Text style={styles.footerText}>EduCare &copy; 2024</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <ModalContent />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 30,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonClose: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '10%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;