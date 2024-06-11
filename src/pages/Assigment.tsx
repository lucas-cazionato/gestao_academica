import React, { useState, useEffect } from 'react';
import { Alert, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listarTrabalhos, removerTrabalho, criarAtividade } from '../api/atividade';
import { listarDisciplinas } from '../api/disciplina';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/styles';
import { Table, Row, Rows } from 'react-native-table-component';
import eventEmitter from './events/eventEmitter';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

interface Atividade {    
    TIPO: "TRABALHO";
    DESCRICAO: string;
    PESO: number;
    DATA: string;
    DISCIPLINA: string;
}

interface Disciplina {
    DISCIPLINA: string;
}

const Assigment: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalExclusaoVisible, setModalExclusaoVisible] = useState(false);

    const [idUsuario, setIdUsuario] = useState<string | null>(null);
    const [indice, setIndice] = useState<number | null>(null);

    const [listaAtividades, setListaAtividades] = useState<Atividade[]>([]);
    const [atividade, setAtividade] = useState('');
    const [descricao, setDescricao] = useState('');    
    const [peso, setPeso] = useState('');
    const [data, setData] = useState('');

    const [listaDisciplinas, setListaDisciplinas] = useState<Disciplina[]>([]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');

    useEffect(() => {
        const getUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setIdUsuario(userId);
        };
        getUserId();
    }, []);

    useEffect(() => {
        const fetchTests = async () => {
            if (idUsuario) {
                try {
                    const atividades = await listarTrabalhos(idUsuario);
                    setListaAtividades(atividades);
                } catch (error) {
                    console.error('Erro ao buscar trabalhos:', error);
                }
            }
        };
        fetchTests();
    }, [idUsuario]);

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

    const tableHead = ['Disciplina', 'Atividade', 'Peso', 'Data', 'Ações'];
    const widthArr = [90, 80, 50, 75, 65]; // Largura fixa para cada coluna

    const tableData = listaAtividades.map((atividade, index) => [
        atividade.DISCIPLINA,
        atividade.DESCRICAO,
        atividade.PESO,
        moment(atividade.DATA, 'YYYY-MM-DD').format('DD/MM/YY').toString(),
        <View key={index} style={styles.content}>
            <TouchableOpacity onPress={() => {
                setIndice(index);  // Atualiza o índice
                setModalExclusaoVisible(true);
            }}>
                <Ionicons name="trash-outline" size={25} color="red" />
            </TouchableOpacity>
        </View>
    ]);

    const acaoCriarTrabalho = async () => {    
        try {
            if (!idUsuario ) return;
            const novoTrabalho: Atividade = {
                TIPO: "TRABALHO",
                DESCRICAO: descricao,
                PESO: parseFloat(peso),
                DATA: moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                DISCIPLINA: disciplinaSelecionada,
            };
            await criarAtividade(novoTrabalho);
            setDisciplinaSelecionada('');
            setDescricao('');
            setPeso('');
            setData('');
            Alert.alert('Trabalho cadastrado com sucesso!');
            setModalVisible(false);
            const atividadesAtualizadas = await listarTrabalhos(idUsuario);
            setListaAtividades(atividadesAtualizadas);
        } catch (error) {
            console.error('Erro ao cadastrar a prova:', error);
            Alert.alert('Erro ao cadastrar a prova. Por favor, tente novamente.');
        }
    };

    const acaoExcluirTrabalho = async (index: number) => {
        try {
            if (!idUsuario || index < 0) return;
    
            const disciplinaExcluir = listaAtividades[index].DISCIPLINA;
            const atividadeExcluir = listaAtividades[index].DESCRICAO;
            await removerTrabalho(idUsuario, disciplinaExcluir, atividadeExcluir);
            
            Alert.alert('Trabalho removido com sucesso!');
            setModalExclusaoVisible(false);
            const atividadesAtualizadas = await listarTrabalhos(idUsuario);
            setListaAtividades(atividadesAtualizadas);
        } catch (error) {
            console.error('Erro ao remover o trabalho:', error);
            Alert.alert('Erro ao remover o trabalho. Por favor, tente novamente.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>EduCare</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>Trabalhos</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setModalVisible(true);
                    if (listaDisciplinas.length > 0) {
                        setDisciplinaSelecionada(listaDisciplinas[0].DISCIPLINA);
                    } else {
                        setDisciplinaSelecionada('');
                    }
                }}>
                    <Text style={styles.buttonText}>Adicionar Trabalho</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.tableContainer}>
                    <Table borderStyle={styles.tableBorder} style={styles.table}>
                        <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableText} widthArr={widthArr}/>
                        <Rows data={tableData} textStyle={styles.rowTableText} widthArr={widthArr}/>
                    </Table>
                </View>
            </View>            
            <View style={styles.footer}>
                <Text>EduCare &copy; 2024</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExclusaoVisible}
                onRequestClose={() => {
                    setModalExclusaoVisible(!modalExclusaoVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.contentText}>Confirma exclusão do Trabalho?</Text>
                        <TouchableOpacity onPress={() => acaoExcluirTrabalho(indice)} style={styles.button}>
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
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.contentText}>Disciplina:</Text>
                        <Picker
                            selectedValue={disciplinaSelecionada}
                            style={styles.picker}
                            onValueChange={(itemValue) => setDisciplinaSelecionada(itemValue)}
                        >
                            {listaDisciplinas.map((disciplina, index) => (
                                <Picker.Item
                                    style={styles.contentText}
                                    key={index} 
                                    label={disciplina.DISCIPLINA} 
                                    value={disciplina.DISCIPLINA} 
                                />
                            ))}
                        </Picker>
                        <Text style={styles.contentText}>Descrição:</Text>
                        <TextInput style={styles.inputModal} value={descricao} onChangeText={setDescricao}/>
                        <Text style={styles.contentText}>Peso:</Text>
                        <TextInput keyboardType="numeric" style={styles.inputModal} value={peso} onChangeText={setPeso}/>
                        <Text style={styles.contentText}>Data (dd/mm/aaaa):</Text>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={data}
                            onChangeText={setData}
                            style={styles.inputModal}
                        />
                        <TouchableOpacity onPress={() => acaoCriarTrabalho()} style={styles.button}>
                            <Text style={styles.buttonText}>Adicionar Trabalho</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </SafeAreaView>
    );

}

export default Assigment;