import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';

const UpdateProfile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <SafeAreaView>
      <View>
        <Text>EduCare</Text>
      </View>
      <View>
        <Text>Nome:</Text>
        <TextInput
        />
        <Text>E-mail:</Text>
        <TextInput
        />
        <Text>Telefone:</Text>
        <TextInput
        />
        <Text>Senha:</Text>
        <TextInput
          placeholder="Digite a nova senha"
          secureTextEntry={true}
        />
        <Text>Confirme a senha:</Text>
        <TextInput
          placeholder="Confirme a nova senha"
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text>Atualizar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default UpdateProfile;