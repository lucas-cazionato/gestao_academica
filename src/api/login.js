import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.75:3000/api';

export const login = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/login`, usuario);
    const usuarioLogado = response.data.usuario;
    const id = usuarioLogado.ID;
    await AsyncStorage.setItem('userId', id.toString());
    return { ...usuarioLogado, id };
  } catch (error) {
    throw error;
  }
};