import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Subject = () => {
    const navigation = useNavigation();
    const [subjectInput, setSubjectInput] = useState<string>('');
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleAddSubject = () => {
        if (subjectInput.trim() !== '') {
            setSubjects([...subjects, subjectInput]);
            setSubjectInput('');
        }
    };

    const handleConsultSubject = (subject: string) => {
        setSelectedSubject(subject);
        setModalVisible(true);
    };
    
    const handleEditSubject = (subject: string) => {
        // Lógica para editar a disciplina
    };
    
    const handleDeleteSubject = (subject: string) => {
        setSubjects(subjects.filter(item => item !== subject));
    };

    const ModalContent = () => (
        <View style={styles.modalContent}>
            <Text>Detalhes da Disciplina:</Text>
            <Text>Nome: {selectedSubject}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView>
            <View>
                <Text>EduCare</Text>
            </View>
            <View>
                <Text>Disciplinas</Text>
                <TextInput
                    placeholder="Nome da Disciplina"
                    value={subjectInput}
                    onChangeText={text => setSubjectInput(text)}
                />
                <TouchableOpacity onPress={handleAddSubject}>
                    <Text><Ionicons name="add-circle-outline" size={24} color="black" style={styles.icon} />Adicionar Disciplina</Text>
                </TouchableOpacity>
            </View>
            <View>
                {subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectContainer}>
                        <Text>{subject}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => handleConsultSubject(subject)}>
                                <Ionicons name="search-outline" size={24} color="blue" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEditSubject(subject)}>
                                <Ionicons name="create-outline" size={24} color="green" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteSubject(subject)}>
                                <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <View>
                <Text>EduCare &copy; 2024</Text>
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
}

const styles = StyleSheet.create({
    subjectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
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
});

export default Subject;