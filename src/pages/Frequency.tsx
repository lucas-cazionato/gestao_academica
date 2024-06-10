import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listarDisciplinas } from '../api/disciplina';
import styles from './styles/styles';
import { Table, Row, Rows } from 'react-native-table-component';
import eventEmitter from './events/eventEmitter';

// Definindo a interface para os dados de disciplina
interface Disciplina {
  DISCIPLINA: string;
  FALTAS: number;
}

const Frequency: React.FC = () => {
  const [idUsuario, setIdUsuario] = useState<string | null>(null);
  const [listaDisciplinas, setListaDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setIdUsuario(userId);
    };
    getUserId();
  }, []);

  useEffect(() => {
    const fetchDisciplinas = async () => {
        if (idUsuario) {
            try {
                const disciplinas = await listarDisciplinas(idUsuario);
                setListaDisciplinas(disciplinas);
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        }
    };
    fetchDisciplinas();

    // Ouve os eventos emitidos pelo EventEmitter
    const listener = () => {
        fetchDisciplinas();
    };
    eventEmitter.on('disciplinaAtualizada', listener);

    // Limpa o listener quando o componente é desmontado
    return () => {
        eventEmitter.off('disciplinaAtualizada', listener);
    };
  }, [idUsuario]);

  const tableHead = ['Disciplina', 'Faltas'];
  const widthArr = [260, 100]; // Largura fixa para cada coluna

  const tableData = listaDisciplinas.map((disciplina) => [
    disciplina.DISCIPLINA,
    disciplina.FALTAS,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Frequência por Disciplina</Text>
      </View>
      <View style={styles.content}>
          <View style={styles.tableContainer}>
              <Table borderStyle={styles.tableBorder} style={styles.table}>
                  <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableHeadText} widthArr={widthArr}/>
                  <Rows data={tableData} textStyle={styles.rowText} widthArr={widthArr}/>
              </Table>
          </View>
      </View>    
      <View style={styles.footer}>
          <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
    
  );
}

export default Frequency;