import React, { useState, useEffect } from 'react';
import { Alert, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { criarDisciplina, listarDisciplinas, removerDisciplina, atualizarDisciplina } from '../api/disciplina';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/styles';
import { Table, Row, Rows } from 'react-native-table-component';
import eventEmitter from './events/eventEmitter';

// Definindo a interface para os dados de disciplina
interface Disciplina {
    DISCIPLINA: string;
    FALTAS: number;
    NOTA: number;
}

const Subject: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalExclusaoVisible, setModalExclusaoVisible] = useState(false);
    const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);
    const [disciplina, setDisciplina] = useState('');
    const [listaDisciplinas, setListaDisciplinas] = useState<Disciplina[]>([]);
    const [idUsuario, setIdUsuario] = useState<string | null>(null);
    const [indice, setIndice] = useState<number | null>(null);
    const [nomeDisciplina, setNomeDisciplina] = useState('');
    const [faltas, setFaltas] = useState('');
    const [nota, setNota] = useState('');

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
    }, [idUsuario]);

    const tableHead = ['Disciplina', 'Faltas', 'Nota', 'Ações'];
    const widthArr = [150, 60, 50, 100]; // Largura fixa para cada coluna

    const tableData = listaDisciplinas.map((disciplina, index) => [
        disciplina.DISCIPLINA,
        disciplina.FALTAS,
        disciplina.NOTA,
        <View key={index} style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {
                setIndice(index);  // Atualiza o índice
                setNomeDisciplina(listaDisciplinas[index].DISCIPLINA);  // Usa o índice atual diretamente
                setFaltas(listaDisciplinas[index].FALTAS.toString());  // Usa o índice atual diretamente
                setNota(listaDisciplinas[index].NOTA.toString());  // Usa o índice atual diretamente
                setModalEdicaoVisible(true);
            }}>
                <Ionicons name="create-outline" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setIndice(index);  // Atualiza o índice
                setModalExclusaoVisible(true);
            }}>
                <Ionicons name="trash-outline" size={30} color="red" />
            </TouchableOpacity>
        </View>
    ]);

    const acaoCriarDisciplina = async () => {    
        try {
            const novaDisciplina = await criarDisciplina({disciplina, idUsuario});
            setDisciplina('');
            Alert.alert('Disciplina cadastrada com sucesso!');
            setModalVisible(false);
            if (idUsuario) {
                const disciplinasAtualizadas = await listarDisciplinas(idUsuario);
                setListaDisciplinas(disciplinasAtualizadas);
                eventEmitter.emit('disciplinaAtualizada');
            }
        } catch (error) {
            console.error('Erro ao realizar o cadastro:', error);
            Alert.alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
        }
    };

    const acaoExcluirDisciplina = async (index: number) => {
        try {
            if (!idUsuario || index < 0) return;
    
            const disciplinaExcluir = listaDisciplinas[index].DISCIPLINA;
            await removerDisciplina(idUsuario, disciplinaExcluir);
            
            Alert.alert('Disciplina removida com sucesso!');
            setModalExclusaoVisible(false);
    
            const disciplinasAtualizadas = await listarDisciplinas(idUsuario);
            setListaDisciplinas(disciplinasAtualizadas);
            eventEmitter.emit('disciplinaAtualizada');
        } catch (error) {
            console.error('Erro ao remover a disciplina:', error);
            Alert.alert('Erro ao remover a disciplina. Por favor, tente novamente.');
        }
    };

    const acaoEditarDisciplina = async () => {
        try {
            if (!idUsuario || indice === null || indice < 0) return;

            const nomeAntigo = listaDisciplinas[indice].DISCIPLINA;
            const disciplinaAtualizada = { nomeAntigo, nomeNovo: nomeDisciplina, faltas, nota };

            await atualizarDisciplina(idUsuario, disciplinaAtualizada);
            
            Alert.alert('Disciplina atualizada com sucesso!');
            setModalEdicaoVisible(false);
    
            const disciplinasAtualizadas = await listarDisciplinas(idUsuario);
            setListaDisciplinas(disciplinasAtualizadas);
            eventEmitter.emit('disciplinaAtualizada');
        } catch (error) {
            console.error('Erro ao atualizar a disciplina:', error);
            Alert.alert('Erro ao atualizar a disciplina. Por favor, tente novamente.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>EduCare</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>Disciplinas</Text>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Adicionar Disciplina</Text>
                </TouchableOpacity>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.contentText}>Nome da Disciplina:</Text>
                        <TextInput style={styles.inputModal} value={disciplina} onChangeText={setDisciplina}/>
                        <TouchableOpacity style={styles.button} onPress={acaoCriarDisciplina}>
                            <Text style={styles.buttonText}>Adicionar Disciplina</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExclusaoVisible}
                onRequestClose={() => {
                    setModalExclusaoVisible(!modalExclusaoVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.contentText}>Confirma exclusão da Disciplina?</Text>
                        <TouchableOpacity onPress={() => acaoExcluirDisciplina(indice)} style={styles.button}>
                            <Text style={styles.buttonText}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalExclusaoVisible(!modalExclusaoVisible)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEdicaoVisible}
                onRequestClose={() => {
                    setModalEdicaoVisible(!modalEdicaoVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.contentText}>Disciplina:</Text>
                        <TextInput style={styles.input} value={nomeDisciplina} onChangeText={setNomeDisciplina} />
                        <Text style={styles.contentText}>Faltas:</Text>
                        <TextInput keyboardType="numeric" style={styles.input} value={faltas} onChangeText={setFaltas} />
                        <Text style={styles.contentText}>Nota:</Text>
                        <TextInput keyboardType="numeric" style={styles.input} value={nota} onChangeText={setNota} />
                        <TouchableOpacity onPress={acaoEditarDisciplina} style={styles.button}>
                            <Text style={styles.buttonText}>Atualizar Disciplina</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalEdicaoVisible(!modalEdicaoVisible)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </SafeAreaView>
    );

}

export default Subject;