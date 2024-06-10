import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { login } from '../api/login';
import { StackParamList } from './types/types';
import styles from './styles/styles'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      const user = await login({ email, senha });
      if (user) {
        navigation.navigate('NavBar');
      } else {
        Alert.alert('Usuário ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Usuário ou senha inválidos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduCare</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.contentText}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;