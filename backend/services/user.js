const db = require('../database');

exports.getAllUsers = (req, res) => {
    db.all("SELECT * FROM USUARIO", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ usuarios: rows });
    });
};
  
exports.createUser = (req, res) => {
    const { nome, email, telefone, senha } = req.body;
    const stmt = db.prepare("INSERT INTO USUARIO (NOME, EMAIL, TELEFONE, SENHA) VALUES (?, ?, ?, ?)");
    stmt.run([nome, email, telefone, senha], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ usuario: { id: this.lastID, nome, email, telefone, senha } });
    });
    stmt.finalize();
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM USUARIO WHERE ID = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Usuario nao encontrado' });
            return;
        }
        res.json({ usuario: row });
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;
    const stmt = db.prepare("UPDATE USUARIO SET NOME = ?, EMAIL = ?, TELEFONE = ?, SENHA = ? WHERE ID = ?");
    stmt.run([nome, email, telefone, senha, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Usuario nao encontrado' });
            return;
        }
        res.json({ usuario: { id, nome, email, telefone, senha } });
    });
    stmt.finalize();
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM USUARIO WHERE ID = ?");
    stmt.run([id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Usuario nao encontrado' });
            return;
        }
        res.json({ message: 'Usuario removido' });
    });
    stmt.finalize();
};