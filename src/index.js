const express = require('express');
const app = express();
app.use(express.json());

const observacoesPorLembreteId = {};

// gera id - npm install uuid
const {
    v4: uuidv4
} = require('uuid');

app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const {
        texto
    } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({
        id: idObs,
        texto
    });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});