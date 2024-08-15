import pino from 'pino';


const transport = pino.transport({
    target: 'pino-pretty',
});

/*const transport_mongo = pino.transport({
    target: 'pino-mongodb',
    options: {
        uri: 'enter_uri_here',
        database: 'enter_db_here',
        collection: 'log-collection',
    },
});*/

export const prettyLogger = pino(transport);
