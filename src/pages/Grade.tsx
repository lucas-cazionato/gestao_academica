import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from './types/types';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Grade: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [tableHead, setTableHead] = useState(['Disciplina', 'Atividade', 'Nota']);
  const [tableData, setTableData] = useState([
    ['Dev de Aplicações Corporativas', 'Prova1\nProva2\nTrabalho da Disciplina', '20\n20\n60'],
    ['Gestão de Empresas', 'Prova 1\nProva2', '50\n50'],
    ['Dev Dispositivos Móveis', 'Seminário\nTrabalho da Disciplina', '40\n60'],
    ['Inteligência Artificial Aplicada', 'Seminário\nProva\nTrabalho', '30\n30\n40'],
    ['Engenharia de Software II', 'Prova 1\nProva2\nTrabalho', '40\n40\n20'],
    ['Interação Humano Computador', 'Trabalho\nProva', '60\n40'],
    ['TCC I', 'Entrega', '95']
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Notas por Disciplina</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

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
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  row: {
    backgroundColor: '#FFF'
  },
  text: {
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
});

export default Grade;