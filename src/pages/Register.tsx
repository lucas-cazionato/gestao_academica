import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';

const Register: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View>
        <Text>EduCare</Text>
      </View>
      <View>
        <Text>Nome:</Text>
        <TextInput
          placeholder="Digite seu nome"
        />
        <Text>E-mail:</Text>
        <TextInput
          placeholder="Digite seu e-mail"
        />
        <Text>Telefone:</Text>
        <TextInput
          placeholder="Digite seu telefone"
        />
        <Text>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <Text>Confirme a senha:</Text>
        <TextInput
          placeholder="Confirme sua senha"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default Register;