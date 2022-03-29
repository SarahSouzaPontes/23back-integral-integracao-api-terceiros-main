const express = require('express');
const { listarEmpresa } = require('../controladores/getEmpresa');

const rotas = express();

rotas.get('/empresas/:dominioEmpresa', listarEmpresa);

module.exports = rotas;