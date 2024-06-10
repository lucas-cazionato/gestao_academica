const express = require('express');
const user = require('../services/user');
const login = require('../services/login');
const disciplina = require('../services/disciplina');

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

module.exports = router;