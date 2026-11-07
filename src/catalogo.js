// Dados privados do servidor. Cada require lê e interpreta o respectivo JSON.
// O Node mantém esses dados em cache durante a execução do processo.
const produtos = require('../dados/produtos.json');
const servicos = require('../dados/servicos.json');
const catalogos = require('../dados/catalogos.json');

module.exports = { produtos, servicos, catalogos };
