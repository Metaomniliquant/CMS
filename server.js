
const serverModule = require('./server/server');

const fallbackPort = 3000;
const deployDirectory = 'dist';
const config = serverModule.ServerConfig.create(process, fallbackPort, __dirname, deployDirectory);
const server = serverModule.Server.start(config);
