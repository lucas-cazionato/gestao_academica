const db = require('../database');

exports.criarAtividade = (req, res) => {
    const { TIPO, DESCRICAO, PESO, DATA, DISCIPLINA } = req.body;
    const stmt = db.prepare("INSERT INTO ATIVIDADE (TIPO, DESCRICAO, PESO, DATA, DISCIPLINA) VALUES (?, ?, ?, ?, ?)");
    stmt.run([TIPO, DESCRICAO, PESO, DATA, DISCIPLINA], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ atividade: { idAtividade: this.lastID, TIPO, DESCRICAO, PESO, DATA, DISCIPLINA } });
    });
    stmt.finalize();
};

exports.listarAtividadesPorUsuario = (req, res) => {
    const { id } = req.params;
    db.all(`SELECT A.ID_ATIVIDADE, A.TIPO, A.DESCRICAO, A.PESO, A.DATA, A.DISCIPLINA
            FROM ATIVIDADE A
            JOIN DISCIPLINA D ON D.DISCIPLINA = A.DISCIPLINA
            JOIN USUARIO U ON U.ID = D.ID_USUARIO
            WHERE U.ID = ?`, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ atividades: rows });
    });
};

exports.listarProvasPorUsuario = (req, res) => {
    const { id } = req.params;
    db.all(`SELECT A.ID_ATIVIDADE, A.TIPO, A.DESCRICAO, A.PESO, A.DATA, A.DISCIPLINA
            FROM ATIVIDADE A
            JOIN DISCIPLINA D ON D.DISCIPLINA = A.DISCIPLINA
            JOIN USUARIO U ON U.ID = D.ID_USUARIO
            WHERE U.ID = ? AND A.TIPO = "PROVA"`, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ atividades: rows });
    });
};

exports.listarTrabalhosPorUsuario = (req, res) => {
    const { id } = req.params;
    db.all(`SELECT A.ID_ATIVIDADE, A.TIPO, A.DESCRICAO, A.PESO, A.DATA, A.DISCIPLINA
            FROM ATIVIDADE A
            JOIN DISCIPLINA D ON D.DISCIPLINA = A.DISCIPLINA
            JOIN USUARIO U ON U.ID = D.ID_USUARIO
            WHERE U.ID = ? AND A.TIPO = "TRABALHO"`, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ atividades: rows });
    });
};

exports.excluirAtividade = (req, res) => {
    const { id } = req.params;
    const { disciplina, atividade } = req.body;
    const stmt = db.prepare(`
        DELETE FROM ATIVIDADE
        WHERE DESCRICAO = ? AND DISCIPLINA IN (
            SELECT D.DISCIPLINA 
            FROM DISCIPLINA D
            JOIN USUARIO U ON U.ID = D.ID_USUARIO
            WHERE U.ID = ? AND D.DISCIPLINA = ?
        )
    `);
    stmt.run([atividade, id, disciplina], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Erro na remocao da atividade' });
            return;
        }
        res.json({ message: 'Atividade removida' });
    });
    stmt.finalize();
};

exports.listarAtividades = (req, res) => {
    db.all(`SELECT * FROM ATIVIDADE`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ error: 'Atividades não encontradas' });
            return;
        }
        res.json({ atividades: rows });
    });
};