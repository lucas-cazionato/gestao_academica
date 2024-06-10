import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserById, updateUser } from '../api/user';
import styles from './styles/styles'

const UpdateProfile: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  useEffect(() => {
    console.log('useEffect triggered');
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
      if (id) {
        try {
          const user = await fetchUserById(id);
          setNome(user.NOME);
          setEmail(user.EMAIL);
          setTelefone(user.TELEFONE);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        }
      }
    };
    getUserId();
  }, []);

  const handleUpdate = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const usuarioAtualizado = { nome, email, telefone, senha };
      if (userId) {
        const response = await updateUser(userId, usuarioAtualizado);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      } else {
        Alert.alert('Erro', 'Usuário não encontrado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Nome:</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text style={styles.contentText}>E-mail:</Text>
        <TextInput style={styles.input} value={email} editable={false} onChangeText={setEmail} />
        <Text style={styles.contentText}>Telefone:</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
        <Text style={styles.contentText}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a nova senha"
          secureTextEntry={true}
        />
        <Text style={styles.contentText}>Confirme a senha:</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme a nova senha"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default UpdateProfile;