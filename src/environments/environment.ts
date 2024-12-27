export const environment = {
    production: true,
    urlApi: 'https://deeppink-termite-689194.hostingersite.com/api-marina-caribia/public/api/',
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
        },
        lancha: {
            name: 'lanchas'
        },
        cliente: {
            name: 'clients'
        },
        motoNaves: {
            name: 'motos_naves'
        },
        cargo: {
            name: 'cargos'
        },
        trabajadores: {
            name: 'trabajadores'
        },
    }
};
