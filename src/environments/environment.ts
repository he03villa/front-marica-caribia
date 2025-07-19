export const environment = {
    production: true,
    urlApi: 'https://zirumadocs.com/api-marina-caribia/public/api/',
    api: {
        login: 'login',
        register: 'register',
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
        },
        typeIdentification: {
            name: 'type_identifications'
        },
        clients: {
            name: 'clients',
            service: {
                unlink: 'unlink'
            }
        },
        empleados: {
            name: 'empleados',
            service: {
                scanFront: 'scan-cedula-front',
                scanBack: 'scan-cedula-back',
                processCedula: 'process-cedula',
                compareFaces: 'compare-faces'
            }
        }
    }
};
