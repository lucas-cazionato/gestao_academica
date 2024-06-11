import axios from 'axios';
import { API_URL } from './api';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data.usuarios;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const createUser = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, usuario);
    return response.data.usuario;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${id}`);
    return response.data.usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export const updateUser = async (id, usuario) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, usuario);
    return response.data.usuario;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`);
    return response.data.message;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};
