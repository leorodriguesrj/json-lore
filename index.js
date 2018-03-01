const SERVER_PORT = parseInt(process.env.JSON_LORE_PORT || 9001);

const winston = require('winston');
const restify = require('restify');
const routes = require('./routes');

const server = restify.createServer({
    name: 'json-lore',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

routes.mount(server);

server.listen(SERVER_PORT, function () {
    winston.info(`${server.name} listening at ${server.url}`);
});

server.on('SIGTERM', () => {
    winston.warn('Got SIGTERM');
    server.close((error) => {
        let exitCode = 0;
        if (error) {
            winston.error(error.message);
            exitCode = 1;
        }
        winston.info('Server offline.');
        process.exit(exitCode);
    });
});