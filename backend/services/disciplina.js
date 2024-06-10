const db = require('../database');

exports.criarDisciplina = (req, res) => {
    const { disciplina, idUsuario } = req.body;
    const stmt = db.prepare("INSERT INTO DISCIPLINA (DISCIPLINA, FALTAS, NOTA, ID_USUARIO) VALUES (?, 0, 0, ?)");
    stmt.run([disciplina, idUsuario], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ disciplina: { idDisciplina: this.lastID, disciplina, faltas: 0, nota: 0, idUsuario } });
    });
    stmt.finalize();
};

exports.listarDisciplinasPorUsuario = (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM DISCIPLINA WHERE ID_USUARIO = ?", [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!rows) {
            res.status(404).json({ error: 'Disciplina nao encontrada' });
            return;
        }
        res.json({ disciplinas: rows });
    });
};

exports.excluirDisciplina = (req, res) => {
    const { id } = req.params;
    const { disciplina } = req.body;
    const stmt = db.prepare("DELETE FROM DISCIPLINA WHERE ID_USUARIO = ? AND DISCIPLINA = ?");
    stmt.run([id, disciplina], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Erro na remocao da disciplina' });
            return;
        }
        res.json({ message: 'Disciplina removida' });
    });
    stmt.finalize();
};

exports.atualizarDisciplina = (req, res) => {
    const { id } = req.params;
    const { nomeAntigo, nomeNovo, faltas, nota } = req.body;
    const stmt = db.prepare("UPDATE DISCIPLINA SET DISCIPLINA = ?, FALTAS = ?, NOTA = ? WHERE ID_USUARIO = ? AND DISCIPLINA = ?");
    stmt.run([nomeNovo, faltas, nota, id, nomeAntigo], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Erro na edicao da disciplina' });
            return;
        }
        res.json({ disciplina: { nomeNovo, faltas, nota, id } });
    });
    stmt.finalize();
};