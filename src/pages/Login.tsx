import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types.tsx';

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView>
      <View>
        <Text>EduCare</Text>
      </View>
      <View>
        <Text>Usuário:</Text>
        <TextInput
          placeholder="Digite seu usuário"
        />
        <Text>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;