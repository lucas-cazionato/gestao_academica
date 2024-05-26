import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { Table, Row, Rows } from 'react-native-table-component';

const Test: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Desenvolvimento de Aplicações Corporativas');
  const [tests, setTests] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [tableHead, setTableHead] = useState(['Disciplina', 'Descrição', 'Peso', 'Data']);
  const [tableData, setTableData] = useState([
    ['Dev de Aplicações Corporativas', 'Prova 1', '20', '10/06/2024'],
    ['Dev de Aplicações Corporativas', 'Prova 2', '20', '24/06/2024'],
    ['Gestão de Empresas', 'Prova 1', '50', '13/05/2024'],
    ['Gestão de Empresas', 'Prova 2', '50', '10/06/2024'],
    ['Inteligência Artificial Aplicada', 'Prova Teórica', '30', '19/06/2024'],
    ['Engenharia de Software II', 'Prova 1', '40', '10/04/2024'],
    ['Engenharia de Software II', 'Prova 2', '40', '22/05/2024'],
    ['Interação Humano Computador', 'Prova Teórica', '30', '13/06/2024'],
  ]);

  const handleAddTest = () => {
    setModalVisible(false);
    // Add your logic to add the test
  };

  const handleConsultTest = () => {
    setModalVisible(false);
    // Add your logic to consult the test
  };

  const handleDeleteTest = () => {
    setModalVisible(false);
    // Add your logic to delete the test
  };

  const ModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Ionicons name="close-circle" size={35} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Disciplina:</Text>
      <Picker
        selectedValue={selectedSubject}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
      >
        <Picker.Item label="Desenvolvimento de Aplicações Corporativas" value="Desenvolvimento de Aplicações Corporativas" />
        <Picker.Item label="Gestão de Empresas" value="Gestão de Empresas" />
        <Picker.Item label="Desenvolvimento para Dispositivos Móveis" value="Desenvolvimento para Dispositivos Móveis" />
        <Picker.Item label="Engenharia de Software II" value="Engenharia de Software II" />
        <Picker.Item label="Inteligência Artificial Aplicada" value="Inteligência Artificial Aplicada" />
        <Picker.Item label="Interação Humano Computador" value="Interação Humano Computador" />
        <Picker.Item label="Trabalho de Conclusão de Curso I" value="Trabalho de Conclusão de Curso I" />
      </Picker>
  
      <Text style={styles.label}>Descrição:</Text>
      <TextInput style={styles.textInput} />
  
      <Text style={styles.label}>Peso:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        maxLength={3}
      />
  
      <Text style={styles.label}>Data:</Text>
      <Text style={styles.selectedDateText}>
        {date.toLocaleDateString('pt-BR')}
      </Text>
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateButton}>
        <Ionicons name="calendar" size={24} color="#4682B4" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleAddTest}>
        <Text style={styles.submitButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Provas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Adicionar Avaliação</Text>
        </TouchableOpacity>
        <View style={styles.tableContainer}>
          <Table borderStyle={styles.tableBorder}>
            <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
            <Rows data={tableData} textStyle={styles.rowText} />
          </Table>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text>EduCare &copy; 2024</Text>
      </View>
      <Modal
        animationType="slide"
        transparent
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4682B4',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tableContainer: {
    width: '100%',
    marginTop: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  head: {
    height: 50,
    backgroundColor: '#4682B4',
  },
  headText: {
    margin: 6,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  rowText: {
    margin: 6,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalContent: {
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#333',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  dateButton: {
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default Test;