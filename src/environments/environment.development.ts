export const environment = {
    production: false,
    urlApi: 'http://127.0.0.1:8001/api/',
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
                facturacion: 'facturacion',
                boteasIsNotFactures: 'boteasIsNotFactures'
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
        puertos_or_destinos: {
            name: 'puertos_or_destinos',
            services: {
                servicios: 'servicios'
            }
        },
        facturas: {
            name: 'facturas',
            service: {
                export: 'export'
            }
        },
        servicios: {
            name: 'servicios'
        },
        conceptos: {
            name: 'conceptos',
            service: {
                storeCliente: 'cliente'
            }
        }
    }
};
