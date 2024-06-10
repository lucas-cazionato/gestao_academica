const db = require('../database');

exports.userLogin = (req, res) => {
    const { email, senha } = req.body;
    db.get("SELECT * FROM USUARIO WHERE EMAIL = ? AND SENHA = ?", [email, senha], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Usuario/Senha invalidos' });
            return;
        }
        res.json({ usuario: row });
    });
};