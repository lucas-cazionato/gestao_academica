const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Criação das Tabelas
db.serialize(() => {
  db.run(`CREATE TABLE USUARIO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT,
    EMAIL TEXT,
    TELEFONE TEXT,
    SENHA TEXT
  )`);

  db.run(`CREATE TABLE DISCIPLINA (
    ID_DISCIPLINA INTEGER PRIMARY KEY AUTOINCREMENT,
    DISCIPLINA TEXT,
    FALTAS INTEGER,
    NOTA INTEGER,
    ID_USUARIO INTEGER,
    FOREIGN KEY(ID_USUARIO) REFERENCES USUARIO(ID)
  )`);

  db.run(`CREATE TABLE ATIVIDADE (
    ID_ATIVIDADE INTEGER PRIMARY KEY AUTOINCREMENT,
    TIPO TEXT CHECK(TIPO IN ('PROVA', 'TRABALHO')),
    DESCRICAO TEXT,
    PESO INTEGER,
    DATA DATE,
    DISCIPLINA TEXT,
    FOREIGN KEY(DISCIPLINA) REFERENCES DISCIPLINA(DISCIPLINA)
  )`);
});

module.exports = db;