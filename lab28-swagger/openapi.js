let openapi = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'TS',
        description: 'TS management API',
        termOfService: 'http://api_url/terms/',
        contact: {
            name: 'BelSTU',
            email: 'isit@belstu.by',
            url: 'https://belstu.by/'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
    },
    servers: [{
        url: 'http://localhost:{port}',
        description: 'Development server',
        variables: {
            port: {
                default: 3000
            }
        }
    }, {
        url: 'https://api/testing:{port}',
        description: 'Staging server',
        variables: {
            port: {
                enum: [443, 8443],
                default: 8443
            }
        }
    }, {
        url: 'https://api/students/belstu.by',
        description: 'Production server'
    }],

    paths: {
        '/ts': {
            get: {
                tags: ['CRUD operation'],
                description: 'Get records',
                operationId: 'getRecords',
                parameters: [{
                    name: 'x-auth-token',
                    in: 'header',
                    schema: { type: 'string' },
                    required: true,
                    description: 'Authentication token'
                }, {
                    name: 'page',
                    in: 'query',
                    schema: {
                        type: 'integer',
                        default: 1
                    },
                    required: false,
                    description: 'Page number'
                }, {
                    name: 'orderBy',
                    in: 'query',
                    schema: { type: 'string' },
                    required: false
                }],
                responses: {
                    '200': {
                        description: 'TS List',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object'
                                    }
                                }, example: [{
                                    id: 25,
                                    name: 'Ivanov',
                                    number: '88005553030'
                                }, {
                                    id: 28,
                                    name: 'Charniauski',
                                    number: '1101'
                                }]
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                },
                                example: {
                                    message: 'TS id is missing',
                                    internal_code: 'missing_parameter'
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ['CRUD operation'],
                description: 'Add record',
                operationId: 'addRecords',
                parameters: [{
                    name: 'x-auth-token',
                    in: 'header',
                    schema: { type: 'string' },
                    required: true,
                    description: 'Authentication token'
                }, {
                    name: 'name',
                    in: 'body',
                    schema: {
                        type: 'string'
                    },
                    required: true,
                    description: `Person's name`
                }, {
                    name: 'number',
                    in: 'body',
                    schema: { type: 'string' },
                    required: true,
                    description: `Person's number`
                }],
                responses: {
                    '200': {
                        description: 'TS List',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object'
                                    }
                                }, example: [{
                                    id: 25,
                                    name: 'Ivanov',
                                    number: '88005553030'
                                }, {
                                    id: 28,
                                    name: 'Charniauski',
                                    number: '1101'
                                }]
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                },
                                example: {
                                    message: 'Missing name of the person',
                                    internal_code: 'missing_parameter_name'
                                }
                            }
                        }
                    }
                },

            },

            put: {
                tags: ['CRUD operation'],
                description: 'Update records',
                operationId: 'updateRecords',
                parameters: [{
                    name: 'x-auth-token',
                    in: 'header',
                    schema: { type: 'string' },
                    required: true,
                    description: 'Authentication token'
                }, {
                    name: 'name',
                    in: 'body',
                    schema: {
                        type: 'string'
                    },
                    required: true,
                    description: `Person's name`
                }, {
                    name: 'number',
                    in: 'body',
                    schema: { type: 'string' },
                    required: true,
                    description: `Person's number`
                }, {
                    name: 'id',
                    in: 'query',
                    schema: { type: 'integer' },
                    required: true,
                    description: `Person's id`
                }],
                responses: {
                    '200': {
                        description: 'TS List',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object'
                                    }
                                }, example: [{
                                    id: 25,
                                    name: 'Ivanov',
                                    number: '88005553030'
                                }, {
                                    id: 28,
                                    name: 'Charniauski',
                                    number: '1101'
                                }]
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                },
                                example: {
                                    message: 'TS id is missing',
                                    internal_code: 'missing_parameter'
                                }
                            }
                        }
                    }
                },

            }, 
            delete: {
                tags: ['CRUD operation'],
                description: 'Delete records',
                operationId: 'deleteRecords',
                parameters: [{
                    name: 'x-auth-token',
                    in: 'header',
                    schema: { type: 'string' },
                    required: true,
                    description: 'Authentication token'
                }, {
                    name: 'id',
                    in: 'query',
                    schema: { type: 'integer' },
                    required: true,
                    description: `Person's id`
                }],
                responses: {
                    '200': {
                        description: 'TS List',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object'
                                    }
                                }, example: [{
                                    id: 25,
                                    name: 'Ivanov',
                                    number: '88005553030'
                                }, {
                                    id: 28,
                                    name: 'Charniauski',
                                    number: '1101'
                                }]
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                },
                                example: {
                                    message: 'TS id is missing',
                                    internal_code: 'missing_parameter'
                                }
                            }
                        }
                    }
                },

            }
        }
    }
}

module.exports = openapi

// requestBody: {
//     content: {
//         'application/json': {
//             name: 'TS info',
//             schema: {
//                 type: 'object'
//             },
//             required: true,
//             description: 'new TS info',
//             example: {
//                 id: 25, 
//                 name: 'Charniauski',
//                 number: '88005553535'
//             }
//         }
//     }
// }