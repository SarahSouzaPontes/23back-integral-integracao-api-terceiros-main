const axios = require('axios')

const instanciaAxios = axios.create({
    baseURL: 'https://companyenrichment.abstractapi.com/v1/',
    params: {
        api_key: '7337ba7bad46456d95eaecb39df35cba'
    }
})

module.exports = { instanciaAxios }