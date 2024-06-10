import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';
import { createUser } from '../api/user';
import styles from './styles/styles'

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleCreateUser = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('As senhas não coincidem');
      return;
    }

    try {
      const novoUsuario = await createUser({ nome, email, telefone, senha });
      setNome('');
      setEmail('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
      Alert.alert('Cadastro realizado com sucesso!');
      navigateToLogin();
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
      Alert.alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.contentText}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.contentText}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        <Text style={styles.contentText}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <Text style={styles.contentText}>Confirme a senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry={true}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default Register;