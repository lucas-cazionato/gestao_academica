import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './api';

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