import React, {useState} from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackParamList } from './types/types.tsx';

LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
  
LocaleConfig.defaultLocale = 'br';

const Schedule: React.FC = () => {
    const [selected, setSelected] = useState('');
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    return (
        <SafeAreaView>
            <View>
                <Text>EduCare</Text>
            </View>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true }
                }}
            />
            <View>
                <Text>EduCare &copy; 2024</Text>
            </View>
        </SafeAreaView>
    );
}

export default Schedule;