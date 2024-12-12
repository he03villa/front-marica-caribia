export const environment = {
    production: false,
    urlApi: 'http://127.0.0.1:7000/api/',
    api: {
        login: 'login',
        user: {
            name: 'users',
            service: {
                save: 'save',
                me: 'me'
            }
        },
        boleta_servicio: {
            name: 'boletas_servicios',
            service: {
                lista: 'lista',
                pdf: 'pdf'
            }
        }
    }
};
