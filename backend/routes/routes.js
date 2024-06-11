const express = require('express');
const user = require('../services/user');
const login = require('../services/login');
const disciplina = require('../services/disciplina');
const atividade = require('../services/atividade');

const router = express.Router();

router.get('/usuarios', user.getAllUsers);
router.post('/usuarios', user.createUser);
router.get('/usuarios/:id', user.getUserById);
router.put('/usuarios/:id', user.updateUser);
router.delete('/usuarios/:id', user.deleteUser);

router.post('/login', login.userLogin);

router.post('/disciplinas', disciplina.criarDisciplina);
router.get('/disciplinas/:id', disciplina.listarDisciplinasPorUsuario);
router.delete('/disciplinas/:id', disciplina.excluirDisciplina);
router.put('/disciplinas/:id', disciplina.atualizarDisciplina);

router.post('/atividades', atividade.criarAtividade);
router.get('/atividades/:id', atividade.listarAtividadesPorUsuario);
router.get('/atividades/provas/:id', atividade.listarProvasPorUsuario);
router.get('/atividades/trabalhos/:id', atividade.listarTrabalhosPorUsuario);
router.delete('/atividades/:id', atividade.excluirAtividade);
router.get('/atividades', atividade.listarAtividades);

module.exports = router;