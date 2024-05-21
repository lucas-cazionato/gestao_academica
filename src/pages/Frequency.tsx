import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types';

const Frequency: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <SafeAreaView>
      <View>
        <Text>EduCare</Text>
      </View>
      <View>
        <Text>Frequency works</Text>
      </View>
      <View>
        <Text>EduCare &copy; 2024</Text>
      </View>
    </SafeAreaView>
  );
}

export default Frequency;