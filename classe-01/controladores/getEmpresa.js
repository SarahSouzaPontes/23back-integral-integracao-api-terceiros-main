
const { instanciaAxios } = require('../servicos/axios')
const fs = require('fs/promises');

const listarEmpresa = async (req, res) => {
    const { dominioEmpresa } = req.params;

    const empresas = JSON.parse(await fs.readFile('./BancodeDados/empresas.json'));
    const empresaExistente = JSON.parse(await fs.readFile('./BancodeDados/empresas.json')).find(empresa => empresa.domain === dominioEmpresa);

    try {
        if (!empresaExistente) {
            const resposta = await instanciaAxios.get(`https://companyenrichment.abstractapi.com/v1/?api_key=${instanciaAxios.defaults.params.api_key}&domain=${dominioEmpresa}`);
            empresas.push(resposta.data);

            if (resposta.data.name !== 'null' || resposta.data.name !== 'undefined') {
                fs.writeFile('./BancodeDados/empresas', JSON.stringify(empresas, null));
                res.json(resposta.data);
            }
            return res.json("{Nome da empresa inválido.}");

        } else {
            res.json(empresaExistente);
        }
    } catch (error) {
        res.status(400).json(error.message)
    }

}

module.exports = {
    listarEmpresa
}