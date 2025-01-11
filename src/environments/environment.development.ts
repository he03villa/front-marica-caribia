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
                pdf: 'pdf',
                facturacion: 'facturacion'
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
