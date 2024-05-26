import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from './types/types';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Frequency: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [tableHead, setTableHead] = useState(['Disciplina', 'Quantidade de Faltas']);
  const [tableData, setTableData] = useState([
    ['Desenvolvimento de Aplicações Corporativas', '2'],
    ['Gestão de Empresas', '3'],
    ['Desenvolvimento para Dispositivos Móveis', '3'],
    ['Inteligência Artificial Aplicada', '3'],
    ['Engenharia de Software II', '2'],
    ['Interação Humano Computador', '0'],
    ['Trabalho de Conclusão de Curso I', '-']
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Frequência por Disciplina</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
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
    height: 40,
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

export default Frequency;