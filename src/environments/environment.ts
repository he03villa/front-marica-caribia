export const environment = {
    production: true,
    urlApi: 'https://api-marina-caribia-production.up.railway.app/api/',
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
