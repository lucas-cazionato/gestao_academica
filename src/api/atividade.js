import axios from 'axios';
import { API_URL } from './api';

export const listarProvas = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/atividades/provas/${id}`);
      return response.data.atividades;
    } catch (error) {
      console.error('Erro ao buscar provas:', error);
      throw error;
    }
};

export const listarTrabalhos = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/atividades/trabalhos/${id}`);
    return response.data.atividades;
  } catch (error) {
    console.error('Erro ao buscar trabalhos:', error);
    throw error;
  }
};

export const removerProva = async (id, disciplina, atividade) => {
  try {
      const response = await axios.delete(`${API_URL}/atividades/${id}`, {
          data: { disciplina, atividade }  // Inclui disciplina e atividade no corpo da requisição
      });
      return response.data.message;  // Retorna a mensagem do backend
  } catch (error) {
      console.error('Erro ao remover prova:', error);
      throw error;
  }
};

export const removerTrabalho = async (id, disciplina, atividade) => {
  try {
      const response = await axios.delete(`${API_URL}/atividades/${id}`, {
          data: { disciplina, atividade }  // Inclui disciplina e atividade no corpo da requisição
      });
      return response.data.message;  // Retorna a mensagem do backend
  } catch (error) {
      console.error('Erro ao remover trabalho:', error);
      throw error;
  }
};

export const criarAtividade = async (atividade) => {
  try {
      const response = await axios.post(`${API_URL}/atividades`, atividade);
      return response.data.atividade;
  } catch (error) {
      console.error('Erro ao cadastrar atividade', error);
      throw error;
  }
};