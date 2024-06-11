import axios from 'axios';
import { API_URL } from './api';

export const criarDisciplina = async (disciplina) => {
    try {
        const response = await axios.post(`${API_URL}/disciplinas`, disciplina);
        return response.data.disciplina;
    } catch (error) {
        console.error('Erro ao cadastrar disciplina:', error);
        throw error;
    }
};

export const listarDisciplinas = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/disciplinas/${id}`);
      return response.data.disciplinas;
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      throw error;
    }
};

export const removerDisciplina = async (id, disciplina) => {
  try {
      const response = await axios.delete(`${API_URL}/disciplinas/${id}`, {
          data: { disciplina }
      });
      return response.data.disciplina;
  } catch (error) {
      console.error('Erro ao remover disciplina:', error);
      throw error;
  }
};

export const atualizarDisciplina = async (id, disciplina) => {
    try {
        const response = await axios.put(`${API_URL}/disciplinas/${id}`, disciplina);
        return response.data.disciplina;
    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        throw error;
    }
};